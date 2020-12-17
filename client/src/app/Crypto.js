import CryptoUtil from './CryptoUtil'

class Crypto extends CryptoUtil {
  constructor() { super(); }

  async generateKeys() {
    let { publicKey, privateKey } = await this.crypto.subtle.generateKey({
      name: this.keyAlgorithm,
      hash: this.hashAlgorithm,
      modulusLength: this.modulusLength,
      publicExponent: this.publicExponent
    }, true, ['encrypt', 'decrypt']);

    return { publicKey, privateKey };
  }

  getEncryptKey() {
    return this.secret.server.publicKey;
  }

  getDecryptKey() {
    return this.secret.app.privateKey;
  }

  async exportKey(key = new CryptoKey, type = 'spki') {
    try {
      let binary = await this.crypto.subtle.exportKey(type, key);
      return binary;
    } catch (error) { console.error(error); }
  }

  async importKey(hexadecimal = '', type = 'spki', extratable = false, usage = ['encrypt', 'decrypt']) {
    try {
      let buffer = this.hexToBinary(hexadecimal);
      return await this.crypto.subtle.importKey(type, buffer, {
        name: this.keyAlgorithm,
        hash: this.hashAlgorithm
      }, extratable, usage);
    } catch (error) { console.error(error); }
  }

  async decrypt(hexadecimal = '') {
    let decryptBuffers = [];
    let privateKey = this.getDecryptKey();

    for(let iv of this.secret.server.ivs) {
      let nextIndex = 0, breakDecrypt = false;

      while(nextIndex < hexadecimal.length) {
        let _v = '';

        if (nextIndex + 1024 < hexadecimal.length)
             _v = hexadecimal.substr(nextIndex, 1024);
        else _v = hexadecimal.substr(nextIndex);
        nextIndex += 1024;

        try {
          let buffer = await this.crypto.subtle.decrypt({
            name: this.keyAlgorithm,
            hash: this.hashAlgorithm,
            iv: iv
          }, privateKey, this.hexToBinary(_v));

          decryptBuffers.push(new Uint8Array(buffer));
          breakDecrypt = true;
        } catch (error) { break; }
      }

      if (breakDecrypt) break;
    }

    if (decryptBuffers.length) return this.binaryToString(this.concatBuffer(decryptBuffers));
    else throw 'failure in decrypt data';
  }

  async encrypt(value = '') {
    let vector = this.getIv(), nextIndex = 0, encryptBuffers = [];

    if (nextIndex < value.length) {
      let _v = '';

      if (_v + 256 < value.length) _v = value.substr(nextIndex, 256);
      else                         _v = value.substr(nextIndex);
      nextIndex += 256;
      
      let buffer = await this.crypto.subtle.encrypt({
        name: this.keyAlgorithm,
        hash: this.hashAlgorithm,
        iv: vector
      }, this.getEncryptKey(), this.stringToBinary(value));

      encryptBuffers.push(new Uint8Array(buffer));
    }

    return this.binaryToHex(this.concatBuffer(encryptBuffers));
  }

  async ecp_dcp_object (object = {}, internalFuncName) {
    let _obj = {};

    for(let key in object) {
      if (!object[key]) continue;
      let _k = await this[internalFuncName](key);
      let _v;

      switch (this.typeOf(object[key])) {
        case 'Nullable':
          continue;
        case 'Object':
          _v = await this.ecp_dcp_object(object[key], internalFuncName); break;
        case 'Array':
          _v = await this.ecp_dcp_array(object[key], internalFuncName); break;
        default:
          _v = await this.ecp_dcp_value(object[key], internalFuncName); break;
      }

      _obj[_k] = _v;
    }

    return _obj;
  }
  
  async ecp_dcp_array (array = [], internalFuncName) {
    let _array = [];
    for(let value of array) {
      let _v;

      switch (value) {
        case 'Nullable':
          continue;
        case 'Object':
          _v = await this.ecp_dcp_object(value, internalFuncName); break;
        case 'Array':
          _v = await this.ecp_dcp_array(value, internalFuncName); break;
        default:
          _v = await this.ecp_dcp_value(value, internalFuncName); break;
      }

      _array.push(_v);
    }

    return _array;
  }

  async ecp_dcp_value (value, internalFuncName) {
    switch (this.typeOf(value)) {
      case 'Nullable':
        return null;
      case 'Object':
        return await this.ecp_dcp_object(value, internalFuncName);
      case 'Array':
        return await this.ecp_dcp_array(value, internalFuncName);
      case 'Date':
        value = value.toJSON(); break;
      default:
        value = value.toString(); break;
    }

    return await this[internalFuncName](value);
  }

  async readStorageKeys() {
    let keys = this.get('keysPair', 'json');

    if (!keys) {
      keys = await this.generateKeys();

      let [pk, pvk] = await Promise.all([
        this.exportKey(keys.publicKey, 'spki'),
        this.exportKey(keys.privateKey, 'pkcs8')
      ]);

      this.set('keysPair', {
        publicKey: this.binaryToHex(pk),
        privateKey: this.binaryToHex(pvk)
      }, 'json');
    } else {
      keys.publicKey = await this.importKey(keys.publicKey, 'spki', true, ['encrypt']);
      keys.privateKey = await this.importKey(keys.privateKey, 'pkcs8', true, ['decrypt']);
    }

    return { publicKey: keys.publicKey, privateKey: keys.privateKey };
  }

  async hash(value = '') {
    let valueBuffer = this.stringToBinary(value);
    let hashBuffer = await this.window.crypto.subtle.digest(this.hashAlg, valueBuffer);
    return this.binaryToHex(hashBuffer);
  }

  // async generateSymetricKey(password, salt) {
  //   let args = {
  //     saltBuffer: '',
  //     passphraseKey: this.stringToBinary(password),
  //     derived: null
  //   };

  //   if (salt)
  //     args.saltBuffer = new Uint8Array(salt);
  //   else
  //     args.saltBuffer = this.crypto.getRandomValues(new Uint8Array(16));

  //   let pbkdf2key = await this.crypto.subtle.importKey(
  //     'raw',
  //     args.passphraseKey,
  //     { name: 'PBKDF2'},
  //     false,
  //     ['deriveBits', 'deriveKey']
  //   );

  //   args.derived = await this.crypto.subtle.deriveKey(
  //     {
  //       name: 'PBKDF2',
  //       salt: args.saltBuffer,
  //       iterations: 50000,
  //       hash: 'SHA-256'
  //     },
  //     pbkdf2key,
  //     { "name": 'AES-CBC', "length": 256 },
  //     true,
  //     ['encrypt', 'decrypt']
  //   );


  //   return args;
  // }
}

export default Crypto