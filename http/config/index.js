const Loggable = require('../../resource/lib/Loggable');

class Config extends Loggable {
  constructor() { super(); }

  listenConfig() {
    let option = {
      host: 'localhost',
      port: 80
    };

    if (this.process.env.HOST) option.host = this.process.env.HOST;
    if (this.process.env.PORT) option.port = this.process.env.PORT;

    return option;
  }

  async readSSL() {

  }

  async getServer(app = this.express()) {
    if (!this.process.env.PROTOCOL) throw 'protocol is not define, please write in .env file';

    if (this.process.env.PROTOCOL.toLowerCase() == 'http') {
      return this.http.createServer(app);
    }

    if (this.process.env.PROTOCOL.toLowerCase() == 'https') {
      return this.https.createServer({}, app);
    }
  }
}

module.exports = Config;