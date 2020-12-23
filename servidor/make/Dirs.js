const Crypto = require('./Crypto');

class Dir extends Crypto {
  constructor() { super(); }

  getDir(path) {
    return `${this.dir}${path}`;
  }
}

module.exports = Dir;