const Translate = require('./Translate');

class CryptoUtil extends Translate {
  constructor() { super(); }

  binaryToHex(binary = new ArrayBuffer()) {
    return Buffer.from(binary).toString('hex');
  }

  hexToBinary(hexadecimal = '') {
    return Buffer.from(hexadecimal, 'hex');
  }

  stringToBase64(text = '') {
    return Buffer.from(text).toString("base64");
  }

  base64ToString(text = '') {
    return Buffer.from(text, 'base64').toString('utf8');
  }

  base64ToHex(base64 = '') {
    return Buffer.from(base64, 'base64').toString('hex');
  }
}

module.exports = CryptoUtil;