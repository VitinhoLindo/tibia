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
  
    let cache = this.app.find(this.request.socket.remoteAddress);

    let spubk, sprivk, apubk, date = new Date(), ivs = [];
    if (cache && cache.app && cache.app.date) {
      spubk  = cache.server.publicKey;
      sprivk = cache.server.privateKey;
      ivs    = cache.server.ivs;
      date   = cache.server.date;
    } else {
      let { publicKey, privateKey }= await this.app.generateKeys();

      spubk  = publicKey;
      sprivk = privateKey;
    }

    apubk = await this.app.importPublicKey(all.p);

    if (!ivs.length) 
      for (let x = 0; x < 20; x++) 
        ivs.push(this.app.getIv());

    return this.responseKey(spubk, sprivk, apubk, date, ivs);
  }

  async put() {
    return this.defaultResponseJSON();
  }

  async delete() {
    return this.defaultResponseJSON();
  }
}

module.exports = SyncController;