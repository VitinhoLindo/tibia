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

  binaryToBase64(binary = new ArrayBuffer()) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < binary.length) {
        chr1 = binary[i++];
        chr2 = i < binary.length ? binary[i++] : Number.NaN;  
        chr3 = i < binary.length ? binary[i++] : Number.NaN;

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                  keyStr.charAt(enc3) + keyStr.charAt(enc4);
    }
    return output;
  }

  base64ToBinary(base64 = '') {
    let keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    let decoded = {};
    let binary  = '';

    let chr1; 
    let chr2 = 0;
    let chr3 = 0;
    let dec1;

    let write = String.fromCharCode;
    let len = base64.length;

    for(let index = 0; index < 64; index++) {
      decoded[keyStr.charAt(index)] = index;
    }

    for(let index = 0; index < len; index++) {
      chr1 = decoded[base64.charAt(index)];
      chr2 = (chr2 << 6) + chr1;
      chr3 += 6;

      while(chr3 >= 8) {
        (
          (
            dec1 = (chr2>>>(chr3 -= 8)&0xff) 
          ) || 
          (
            index<(len - 2)
          )
        ) && (
          binary += write(dec1)
        );
      }
    }

    let buffer = new Uint8Array(binary.length);
    for(let index in binary) buffer[index] = binary.charCodeAt(index); 
    return buffer;
  }
}

export default CryptoUtil