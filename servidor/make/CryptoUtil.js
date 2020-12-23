const Loggable =  require('./Loggable');

class CryptoUtil extends Loggable {
  constructor() { super(); }

  toHex(value = '') {
    return Buffer.from(value).toString('hex');
  }

  bufferHex(value = '') {
    return Buffer.from(value, 'hex');
  }
}

module.exports = CryptoUtil;