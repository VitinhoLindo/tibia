const CryptoUtil = require('./CryptoUtil');

class Crypto extends CryptoUtil {
  keys = {
    server: {
      secret: '',
      key   : null
    },
    jwt: {
      secret: '',
      key   : null
    }
  }

  constructor() { super(); }

  getIv() {
    return this.crypto.webcrypto.getRandomValues(new Uint8Array(this.ivLen));
  }

  readKey() {
    let serversecret = this.process.env.SECRET;
    let serverkey    = this.process.env.KEY;
    let jwtsecret    = this.process.env.JWT_SECRET;
    let jwtkey       = this.process.env.JWT_KEY;

    if (
      !serversecret || 
      !serverkey    ||
      !jwtsecret    ||
      !jwtkey
    ) throw 'please execute command \'node make --set=env\' to configure \'KEY\' and \'IV\'';

    this.keys = {
      server: {
        secret: serversecret,
        key   : Buffer.from(serverkey, 'hex')
      },
      jwt   : {
        secret: jwtsecret,
        key   : Buffer.from(jwtkey, 'hex')
      }
    }
  }

  getScrypt(type = 'server') {
    if (type == 'jwt') {
      return this.crypto.scryptSync(
        this.keys.jwt.secret,
        this.salt,
        this.saltRange
      )
    } else {
      return this.crypto.scryptSync(
        this.keys.server.secret,
        this.salt,
        this.saltRange
      );
    }
  }

  getCipher(type = 'server') {
    if (type == 'jwt') {
      return this.crypto.createCipheriv(
        this.encryptCipher,
        this.getScrypt(type),
        this.keys.jwt.key
      );
    } else {
      return this.crypto.createCipheriv(
        this.encryptCipher,
        this.getScrypt(),
        this.keys.server.key
      );
    }
  }

  getDecipher(type = 'server') {
    if (type == 'jwt') {
      return this.crypto.createDecipheriv(
        this.encryptCipher,
        this.getScrypt(type),
        this.keys.jwt.key
      )
    } else {
      return this.crypto.createDecipheriv(
        this.encryptCipher,
        this.getScrypt(),
        this.keys.server.key
      );
    }
  }

  format(type = 'encrypt', args = { type: 'server', format: 'utf8', toFormat: 'hex' }) {
    if (type == 'encrypt') {
      if (!args.type)     args.type     = 'server';
      if (!args.format)   args.format   = 'utf8';
      if (!args.toFormat) args.toFormat = 'hex';
      return args;
    }
    if (type == 'decrypt') {
      if (!args.type)     args.type     = 'server';
      if (!args.format)   args.format   = 'hex';
      if (!args.toFormat) args.toFormat = 'utf8';
      return args;
    }
  }

  encrypt(value, arg = { type: 'server', format: 'utf8', toFormat: 'hex' }) {
    arg = this.format('encrypt');
    let chiper = this.getCipher(arg.type), encrypted = '';

    encrypted += chiper.update(value, arg.format, arg.toFormat);
    encrypted += chiper.final(arg.toFormat);

    return encrypted;
  }

  decrypt(value, arg = { type: 'server', format: 'hex', toFormat: 'utf8' }) {
    arg = this.format('decrypt');
    let dechiper = this.getDecipher(arg.type), decrypted = '';

    decrypted += dechiper.update(value, arg.format, arg.toFormat);
    decrypted += dechiper.final(arg.toFormat);

    return decrypted;
  }

  async generateKeys() {
    let { publicKey, privateKey } = await this.crypto.webcrypto.subtle.generateKey({
      name: this.keyAlgorithm,
      hash: this.hashAlgorithm,
      modulusLength: this.modulusLength,
      publicExponent: this.publicExponent
    }, true, ['encrypt', 'decrypt']);

    return { publicKey, privateKey };
  }

  async exportPublicKey(publicKey) {
    return await this.crypto.webcrypto.subtle.exportKey(
      'spki', 
      publicKey
    );
  }

  async importPublicKey(hexadecimal = '') {
    let bytes = Buffer.from(hexadecimal, 'hex');

    return await this.crypto.webcrypto.subtle.importKey(
      'spki',
      bytes,
      {
        name: this.keyAlgorithm,
        hash: this.hashAlgorithm
      },
      false, ['encrypt']
    );
  }

  getHash() {
    return this.crypto.createHash(this.serverHash);
  }

  hash(value = '') {
    let hash = this.getHash();
    return hash.update(value).digest('hex');
  }
}

module.exports = Crypto;