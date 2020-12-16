const Base = require('./Base');

class SyncService extends Base {
  constructor(request, response) { super(request, response); }

  async responseKey(serverPublicKey, serverPrivateKey, appPublicKey, date, ivs) {
    this.app.save(this.request.socket.remoteAddress, {
      app: {
        publicKey: appPublicKey,
      },
      server: {
        publicKey: serverPublicKey,
        privateKey: serverPrivateKey,
        date: date,
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
}

module.exports = SyncService;