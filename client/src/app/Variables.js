class Variables {
  constructor() { 
    this.defaultHeaders = {};

    this.languages = [];

    this.lang = {
      language: '',
      labels: {}
    }

    this.events = {
      maxListener: 0
    }

    this.secret = {
      app: {
        publicKey: null,
        privateKey: null
      },
      server: {
        publicKey: null,
        date: null,
        ivs: []
      }
    }

    this.keyAlgorithm   = 'RSA-OAEP';
    this.hashAlgorithm  = 'SHA-512';
    this.modulusLength  = 4096;
    this.publicExponent = new Uint8Array([0x01, 0x00, 0x01]);
    this.ivLen          = 16;

    this.hashAlg        = 'SHA-256';
  }
}

export default Variables;