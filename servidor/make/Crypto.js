const CryptoUtil = require('./CryptoUtil')

class Crypto extends CryptoUtil {
  constructor() { 
    super();
    require('dotenv').config();
  }
  
  readEnv() {
    let keys = {
      serversecret: this.process.env.SECRET,
      serverkey   : this.process.env.KEY,
      jwtsecret   : this.process.env.JWT_SECRET,
      jwtkey      : this.process.env.JWT_KEY
    }
    
    if (
      !keys.serversecret ||
      !keys.serverkey ||
      !keys.jwtsecret ||
      !keys.jwtkey
      ) throw 'please execute command node make --set=env'
      
    keys.serverkey = this.bufferHex(keys.serverkey);
    keys.jwtkey    = this.bufferHex(keys.jwtkey);
    
    this.cryptoKeys = keys;
  }
    
  getIv() {
    return this.crypto.randomBytes(16);
  }
  
  getHash() {
    return this.crypto.createHash(this.hashAlg);
  }

  getKey() {
    this.readEnv()
    return this.crypto.scryptSync(
      this.cryptoKeys.serversecret,
      this.cryptoSalt,
      this.cryptoSaltRange
    );
  }

  getCipher() {
    return this.crypto.createCipheriv(
      this.cryptoAlg,
      this.getKey(),
      this.cryptoKeys.serverkey
    );
  }

  getDecipher() {
    return this.crypto.createDecipheriv(
      this.cryptoAlg,
      this.getKey(),
      this.cryptoKeys.serverkey
    );
  }

  encrypt(value = '') {
    let cipher = this.getCipher(), encrypted = '';

    encrypted += cipher.update(value, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  }

  decrypt(value = '') {
    let decipher = this.getDecipher(), decrypted = '';

    decrypted += decipher.update(value, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
  }

  hash(value = '') {
    let hash = this.getHash();

    hash.update(value);
    return hash.digest('hex');
  }
}

module.exports = Crypto;