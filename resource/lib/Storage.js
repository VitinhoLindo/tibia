const Util = require('./Util');

class Storage extends Util {
  constructor() { super(); }

  async readFile(__path, encoding = {}) {
    return this.fs.readFileSync(__path, encoding);
  }
}

module.exports = Storage;