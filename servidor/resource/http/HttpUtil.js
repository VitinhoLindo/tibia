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

  getKeys() {
    let cache = this.app.find(this.request.socket.remoteAddress);

    if (
      !cache || 
      !cache.app || 
      !cache.server ||
      !cache.app.publicKey ||
      !cache.server.publicKey || 
      !cache.server.privateKey ||
      !cache.server.ivs ||
      !cache.server.date
    ) return null;

    return {
      app: { publicKey: cache.app.publicKey },
      server: { publicKey: cache.server.publicKey, privateKey: cache.server.privateKey, ivs: cache.server.ivs, date: cache.server.date }
    }
  }

  async decrypt(hexadecimal = '') {
    let keys = this.getKeys();

    if (!keys)
      throw `dont\'t exists server private key for ${this.request.socket.remoteAddress}`;

    let { server: { privateKey, ivs } } = keys;
    let decryptBuffers = [];

    for(let iv of ivs) {
      let nextIndex = 0, breakDecrypt = false;

      while(nextIndex < hexadecimal.length) {
        let value = '';

        if (nextIndex + 1024 < hexadecimal.length) value = hexadecimal.substr(nextIndex, 1024);
        else                                       value = hexadecimal.substr(nextIndex);
        nextIndex += 1024;

        try {
          let buffer = await this.app.crypto.webcrypto.subtle.decrypt({
            name: this.app.keyAlgorithm,
            hash: this.app.hashAlgorithm,
            iv  : iv
          }, privateKey, Buffer.from(value, 'hex'));
          
          decryptBuffers.push(new Uint8Array(buffer));
          breakDecrypt = true;
        } catch (error) { break; }
      }

      if (breakDecrypt) break;
    }

    if (decryptBuffers.length)
      return Buffer.concat(decryptBuffers).toString('utf-8');
    else 
      throw 'failure in decrypt data';
  }

  async encrypt(value = '') {
    let keys = this.getKeys();

    if (!keys)
      throw `dont\'t exists app public key for ${this.request.socket.remoteAddress}`;

    const { app: { publicKey }, server: { ivs } } = keys;
    let iv = this.app.randomArrayValue(ivs);
    let encryptBuffers = [], nextIndex = 0;

    while(nextIndex < value.length) {
      let _v = '';

      if (nextIndex + 256 < value.length) {
        _v = value.substr(nextIndex, 256);
      } else {
        _v = value.substr(nextIndex);
      }
      nextIndex += 256;

      let buffer = await this.app.crypto.webcrypto.subtle.encrypt({
        name: this.app.keyAlgorithm,
        hash: this.app.hashAlgorithm,
        iv  : iv
      }, publicKey, Buffer.from(_v, 'utf-8'));

      encryptBuffers.push(new Uint8Array(buffer));
    }

    return Buffer.concat(encryptBuffers).toString('hex');
  }

  async ecp_dcp_object(object = {}, internalFuncionName) {
    let _object = {};

    for(let key in object) {
      if (!object[key]) continue;
      let _k = await this[internalFuncionName](key);
      let _v;

      switch (this.app.typeof(object[key])) {
        case 'Nullable':
          continue;
        case 'Object':
          _v = await this.ecp_dcp_object(object[key], internalFuncionName); break;
        case 'Array':
          _v = await this.ecp_dcp_array(object[key], internalFuncionName); break;
        default:
          _v = await this.ecp_dcp_value(object[key], internalFuncionName); break;
      }

      _object[_k] = _v;
    }

    return _object
  }

  async ecp_dcp_array(array = [], internalFuncionName) {
    let _array = [];
    for(let value of array) {
      let _v;

      switch (this.app.typeof(value)) {
        case 'Nullable': continue;
        case 'Object': _v = await this.ecp_dcp_object(value, internalFuncionName); break;
        case 'Array': _v = await this.ecp_dcp_array(value, internalFuncionName); break;
        default: _v = await this.ecp_dcp_value(value, internalFuncionName); break;
      }

      _array.push(_array);
    }

    return _array;
  }

  async ecp_dcp_value(value, internalFuncionName) {
    switch (this.app.typeof(value)) {
      case 'Nullable': return null;
      case 'Object': return await this.ecp_dcp_object(value, internalFuncionName);
      case 'Array': return await this.ecp_dcp_array(value, internalFuncionName);
      case 'Date': value = value.toJSON(); break;
      default: value = value.toString(); break;
    }

    return await this[internalFuncionName](value);
  }
}

module.exports = HttpUtil;