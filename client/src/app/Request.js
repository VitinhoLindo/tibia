import Crypto from './Crypto'

import Axios from 'axios'

class MyRequestOption {
  constructor() {
    this.url = '';
    this.method = '';
    this.params = {};
    this.data = {};
    this.headers = {};
    this.encrypt = false;
  }
}

class ResponseServer {
  constructor(data) {
    this.message = data.message || 'default model response';
    this.code = data.code || 404;
    this.result = data.result || {};
    this.status = data.status || 'error';
  }

  static instance(data) {
    return new ResponseServer(data);
  }
}

class Request extends Crypto {
  constructor() {
    super();
    this.protocol = 'http';
    this.domain   = '10.0.0.108';
    this.port     = '80';
    this.path     = `${this.protocol}://${this.domain}:${this.port}`;
  }

  defaultHeader(headers = {}) {
    for(let key in this.defaultHeaders)
      if (!headers[key]) 
        headers[key] = this.defaultHeaders[key];

    return headers;
  }

  async params(params = {}, encrypt = false) {
    let data = Object.assign({}, params);

    if (encrypt) {
      this.emit('loading-message', { message: 'ENCRYPT-LABEL' });
      data = await this.ecp_dcp_value(data, 'encrypt');
    }

    return data;
  }

  async data(data = {}, encrypt = false) {
    let body = Object.assign({}, data);

    if (encrypt) {
      this.emit('loading-message', { message: 'ENCRYPT-LABEL' });
      body = await this.ecp_dcp_value(body, 'encrypt');
    }

    return body;
  }

  async request(option = new MyRequestOption) {
    try {
      option.headers = this.defaultHeader(option.headers);

      let params = await this.params(option.params || {}, option.encrypt);
      let body   = await this.data(option.data || {}, option.encrypt);

      let { data } = await Axios({
        url: this.path + option.url,
        method: option.method || 'GET',
        params: params || {},
        data: body || {},
        headers: option.headers
      });

      if (data.result.expiredCrypto) {
        this.emit('loading-message', { message: 'SYNC-RSA-LABEL' });
        await this.sync({ build: true });

        if (!option.count) {
          option.count = 1;
        }
        else if (option.count == 2) {
          throw 'error in request'
        }
        else {
          option.count += 1;
        }

        await this.sleep(1);
        return await this.request(option);
      }

      if (data.result.authentication) {
        return this.authentication();
      }

      if (option.encrypt) {
        this.emit('loading-message', { message: 'DECRYPT-LABEL' });
        data.result = await this.ecp_dcp_value(data.result, 'decrypt');
      }

      return ResponseServer.instance(data);
    } catch (error) {
      return ResponseServer.instance({
        code: 400,
        message: error,
        status: 'error',
        result: {}
      });
    }
  }

  async sync() {
    let { publicKey, privateKey } = await this.readStorageKeys();

    this.secret.app = {
      publicKey: publicKey,
      privateKey: privateKey
    };

    let exportedKey = await this.exportKey(publicKey);
    let { result, message, status } = await this.request({
      url: '/sync',
      method: 'post',
      data: {
        p: this.binaryToHex(exportedKey)
      }
    });

    if (status == 'error') return console.error(message);

    let serverPublicKey = await this.importKey(result.p, 'spki', true, ['encrypt']);
    let ivs = result.i.map((i) => this.hexToBinary(i));

    this.secret.server = {
      publicKey: serverPublicKey,
      date: new Date(result.d),
      ivs: ivs
    }
  }

  async authentication(auth) {
    if (!auth) {
      let { code, message, result, status } = await this.request({
        url: '/login',
        method: 'get',
        encrypt: true
      });

      if (status == 'error') {
        this.defaultHeaders['Authentication'] = '';
        this.emit('authentication', false);
        return console.error(message);
      } 

      auth = result.auth;
    }

    this.defaultHeaders['Authentication'] = `Bearer ${auth}`;
    this.emit('authentication', !!auth);
  }
}

export default Request;