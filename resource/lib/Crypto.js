const CryptoUtil = require('./CryptoUtil');

class Crypto extends CryptoUtil {
  key = {
    pass: '',
    iv: null
  }

  constructor() { super(); }

  getIv() {
    return this.crypto.webcrypto.getRandomValues(new Uint8Array(this.ivLen));
  }

  readKey() {
    let key = this.process.env.KEY;
    let iv  = this.process.env.IV;

    if (!key || !iv) throw 'please execute command \'node make --set=env\' to configure \'KEY\' and \'IV\'';

    this.key.pass = key;
    this.key.iv   = Buffer.from(iv, 'hex');
  }

  generateKey() {
    return this.crypto.scryptSync(
      this.key.pass,
      this.salt,
      this.saltRange
    )
  }

  getEncrypt() {
    return this.crypto.createCipheriv(this.encryptCipher, this.generateKey(), this.key.iv);
  }

  getDecrypt() {
    return this.crypto.createDecipheriv(this.encryptCipher, this.generateKey(), this.key.iv);
  }

  encrypt(value) {
    let chiper = this.getEncrypt(), encrypted = '';

    encrypted += chiper.update(value, 'utf8', 'hex');
    encrypted += chiper.final('hex');

    return encrypted;
  }

  decrypt(value) {
    let dechiper = this.getDecrypt(), decrypted = '';

    decrypted += dechiper.update(value, 'hex', 'utf8');
    decrypted += dechiper.final('utf8');

    return decrypted;
  }

  async generateKeys() {
    let { publicKey, privateKey } = await this.crypto.webcrypto.subtle.generateKey({
      name: this.keyAlgorithm,
      hash: this.hashAlgorithm,
      modulusLength: this.modulusLength,
      publicExponent: this.publicExponent
    }, 
    true, 
    ['encrypt', 'decrypt']
    );

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