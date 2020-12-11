const SyncService = require('../service/SyncService')

class SyncController extends SyncService {
  constructor(request, response) { super(request, response) }

  static using(request, response) {
    return new SyncController(request, response);
  }

  async option() {
    return this.defaultResponseJSON();
  }

  async get() {
    return this.defaultResponseJSON();
  }
  
  async post() {
    let all = this.all();

    let validator = this.Validator.make(all, {
      p: 'required|string'
    }, {  
      p: {
        required: 'p value is required',
        string: 'required type p string'
      }
    });

    if (validator.fails()) {
      return this.defaultResponseJSON(validator.modelResponse());
    }
  
    let cache = this.app.find(this.request.socket.remoteAddress)

    let spubk, sprivk, apubk, date = new Date(), ivs = [];
    if (cache && cache.app && cache.app.dateCrypto && !all.build) {
      spubk  = cache.server.publicKey;
      sprivk = cache.server.privateKey;
      date   = cache.app.dateCrypto;
    } else {
      let { publicKey, privateKey }= await this.app.generateKeys();

      spubk  = publicKey;
      sprivk = privateKey;
    }

    apubk = await this.app.importPublicKey(all.p);

    for (let x = 0; x < 20; x++) {
      ivs.push(this.app.getIv());
    }

    return this.responseKey(spubk, sprivk, apubk, date, ivs);
  }

  async responseKey(serverPublicKey, serverPrivateKey, appPublicKey, date, ivs) {
    this.app.save(this.request.socket.remoteAddress, {
      app: {
        publicKey: appPublicKey,
        date: date
      },
      server: {
        publicKey: serverPublicKey,
        privateKey: serverPrivateKey,
        ivs: ivs
      }
    });

    let exported = await this.app.exportPublicKey(serverPublicKey);
    return this.defaultResponseJSON({ 
      result: {
        p: this.app.binaryToHex(exported),
        i: ivs.map((iv) => {
          return this.app.binaryToHex(iv);
        }),
        d: date
      }
    });
  }

  async put() {
    return this.defaultResponseJSON();
  }

  async delete() {
    return this.defaultResponseJSON();
  }
}

module.exports = SyncController;