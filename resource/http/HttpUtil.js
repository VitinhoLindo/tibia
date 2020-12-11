const express = require('express');
const Validator = require('./Validator');

class HttpUtil {
  request = express.request;
  response = express.response;
  Validator = Validator;
  app = require('../../http')();

  constructor(request, response) {
    this.request = request;
    this.response = response;
    this.app = request.getApp();
  }

  cacheCrypto() {
    let cache = this.app.find(this.request.socket.remoteAddress);
    return cache ? true : false;
  }

  getRandomIvs(ivs = [new Uint8Array(16)]) {
    let index = this.app.randomNumber(0, ivs.length - 1);
    return ivs[index];
  }

  async decrypt(value) {
    let cache = this.app.find(this.request.socket.remoteAddress);

    if (!cache || !cache.server || !cache.server.privateKey) {
      throw `dont\'t exists server private key for ${this.request.socket.remoteAddress}`;
    }

    // console.log(cache.server.privateKey);

    // let decryptoBuffer = null, count = 0;
    // let bufferValue = Buffer.from(value, 'hex');

    let decryptoBuffer = await this.app.crypto.webcrypto.subtle.decrypt({
      name: this.app.keyAlgorithm,
      iv: new Uint8Array([15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30])
    }, cache.server.privateKey, Buffer.from(value, 'hex'));

    return Buffer.from(decryptoBuffer).toString('utf-8');
    // while(count < 10) {
    //   try {
    
    //     break;
    //   } catch (error) { }
    //   count++;
    // }

    // if (decryptoBuffer) {
    //   return Buffer.from(decryptoBuffer, 'utf-8').toString();
    // }
    // else {
    //   throw 'failure in decrypt data';
    // }
  }

  async encrypt(value) {
    let cache = this.app.find(this.request.socket.remoteAddress);

    if (!cache || !cache.app || !cache.app.publicKey) {
      throw `dont\'t exists app public key for ${this.request.socket.remoteAddress}`;
    }
    
    let encryptBuffer = await this.app.crypto.webcrypto.subtle.encrypt({
      name: this.app.keyAlgorithm,
      hash: this.app.hashAlgorithm,
      iv: new Uint8Array([15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30])
    }, cache.app.publicKey, Buffer.from(value, 'utf-8'));

    return Buffer.from(encryptBuffer).toString('hex');
  }

  async encryptOrDecryptObject(param, func) {
    let object = {};

    for (let key in param) {
      let value = param[key];
      let _k = await this[func](key), _v;

      if (!value) {
        _v = null;
        continue;
      }
      switch (value.constructor.name) {
        case 'Object':
          _v = await this.encryptOrDecryptObject(value, func); break;
        case 'Array':
          _v = await this.encryptOrDecryptArray(value, func); break;
        default:
          _v = await this.encryptOrDecrypt(value, func); break;
      }

      object[_k] = _v;
    }

    return object;
  }

  async encryptOrDecryptArray(param, func) {
    let array = [];

    for (let value of param) {
      let _v;

      if (!value) {
        _v = null;
        continue;
      }
      switch (value.constructor.name) {
        case 'Object':
          _v = await this.encryptOrDecryptObject(value, func); break;
        case 'Array':
          _v = await this.encryptOrDecryptArray(value, func); break;
        default:
          _v = await this.encryptOrDecrypt(value, func); break;
      }

      array.push(_v);
    }

    return array;
  }

  async encryptOrDecrypt(value, func) {
    if (!value) return null;

    switch (value.constructor.name) {
      case 'String':
        return await this[func](value);
      case 'Number':
        return await this[func](value.toString());
      case 'Object':
        return await this.encryptOrDecryptObject(value, func);
      case 'Array':
        return await this.encryptOrDecryptArray(value, func);
      case 'Date':
        return await this[func](value.toJSON());
      default: {
        return null;
      }
    }
  }
}

module.exports = HttpUtil;