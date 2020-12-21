const Config = require('./config');
const Route  = require('./route');

class Http extends Config {
  constructor() { super(); }

  async listen() {
    const config = this.listenConfig();
    const app    = this.express();

    this.setRequestFileLength();
    this.readTranslates();
    Route(this, app);

    const server = await this.getServer(app);
    server.setTimeout(8000);

    server.listen(config, () => {
      this.emit('print', [
        { message: 'server open in', color: 'blue'},
        { message: `\n  HOST: ${config.host}\n  PORT: ${config.port}`, color: 'magenta' }
      ]);
    });
  }
}

module.exports = function (__dir) {
  require('dotenv').config();

  const http = new Http;

  http.readKey();
  http.path.setPlataform(http.process.platform);
  http.path.setDirName(__dir || __dirname.replace(`${http.path.dirs.dir}http`, ''));

  return http;
};