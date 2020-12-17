import Cache from './Cache'

class CryptoUtil extends Cache {
  constructor() { super(); }

  /**
   * @param {*} binary 
   * 
   * return String['hexadecimal']
   */
  binaryToHex(binary = new ArrayBuffer()) {
    let hexValue = '';
    let bytes    = new Uint8Array(binary);

    for(let byte of bytes) {
      let hex   = byte.toString(16);
      hexValue += (`000${hex}`).slice(-2); 
    }

    return hexValue;
  }

  concatBuffer(array = []) {
    let len = 0, count = 0;
    for(let v of array) len += v.length;

    let concat = new Uint8Array(len);

    for(let v of array) {
      for(let byte of v) {
        concat[count] = byte;
        count++;
      }
    }

    return concat;
  }

  /**
   * @param {*} hexadecimal 
   * 
   * return Uint8Array
   */
  hexToBinary(hexadecimal = '') {
    let bytes = new Uint8Array(hexadecimal.length / 2);
    let nextIndex = 0;

    while(nextIndex < hexadecimal.length) {
      let hex = '';
      if (nextIndex + 2 < hexadecimal.length) {
        hex = hexadecimal.substr(nextIndex, 2);
      } else {
        hex = hexadecimal.substr(nextIndex);
      }

      bytes[nextIndex / 2] = parseInt(hex, 16);

      nextIndex += 2;
    }

    return bytes.buffer;
  }

  binaryToString(binary = new ArrayBuffer()) {
    let string = '';
    let bytes  = new Uint8Array(binary);

    for(let byte of bytes) {
      string += String.fromCharCode(byte);
    }

    return string;
  }

  stringToBinary(value = '') {
    let stringUtf8 = unescape(encodeURIComponent(value));
    let bytes = new Uint8Array(stringUtf8.length);

    for(let index in stringUtf8) bytes[index] = stringUtf8.charCodeAt(index);
    return bytes;
  }

  ivInfo() {
    return this.arrayInfo(this.secret.server.ivs);
  }

  getIv(index = 0) {
    if (!index) {
      let { initial, final } = this.ivInfo();
      return this.secret.server.ivs[
        this.randomNumber(initial, final)
      ];
    }

    return this.secret.server.ivs[index];
  }
}

export default CryptoUtil