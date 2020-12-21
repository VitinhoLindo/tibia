const Event = require('../util/Event');
const Path = require('../util/Path');

class Variables extends Event {
  // paths of project
  path = Path;

  serverLang = 'pt-BR';
  langs = {}

  //
  cache = {}

  //
  smtp = {
    host: '',
    port: '',
    auth: {
      user: '',
      pass: ''
    }
  }

  serverHash = 'sha256';

  //
  encryptCipher = 'aes-192-cbc';
  salt          = 'salt';
  saltRange     = 24;

  keyAlgorithm   = 'RSA-OAEP';
  hashAlgorithm  = 'SHA-512';
  modulusLength  = 4096;
  publicExponent = new Uint8Array([0x01, 0x00 , 0x01]);
  ivLen = 16;

  limitFileLength = 20000000;

  constructor() { super(); }
}

module.exports = Variables;