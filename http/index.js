const Config = require('./config');
const Route  = require('./route');

class Http extends Config {
  constructor() { super(); }

  async listen() {
    const app    = this.express();
    Route(this, app);

    const server = await this.getServer(app);
    server.setTimeout(8000);

    server.listen(this.listenConfig());
  }
}

module.exports = function (__dir) {
  require('dotenv').config();

  const http = new Http;

  http.path.setPlataform(http.process.platform);
  http.path.setDirName(__dir || __dirname.replace(`${http.path.dirs.dir}http`, ''));

  return http;
};