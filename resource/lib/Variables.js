const Event = require('../util/Event');
const Path = require('../util/Path');

class Variables extends Event {
  // paths of project
  path = Path;

  serverLang = 'pt-BR';

  //
  cache = {}

  //
  encryptCipher = 'aes-192-cbc';
  salt          = 'salt';
  saltRange     = 24;

  keyAlgorithm   = 'RSA-OAEP';
  hashAlgorithm  = 'SHA-256';
  modulusLength  = 2048;
  publicExponent = new Uint8Array([1, 0 , 1]);
  ivLen = 16;

  constructor() { super(); }
}

module.exports = Variables;