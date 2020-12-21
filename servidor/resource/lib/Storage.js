const Util = require('./Util');

class Storage extends Util {
  constructor() { super(); }

  readDir(path, encoding = { encoding: 'utf8' }) {
    try {
      let content = this.fs.readdirSync(path, encoding);
      return {
        exists: true,
        content: content
      }
    } catch(error) {
      return {
        exists: false,
        content: []
      }
    }
  }

  readFile(path, encoding = { encoding: 'utf8' }) {
    try {
      let content = this.fs.readFileSync(path, encoding);
      return {
        exists: true,
        content: content
      }
    } catch (error) {
      return {
        exists: false,
        content: null
      }
    }
  }

  statFile(path, encoding = { encoding: 'utf8' }) {
    try {
      let content = this.fs.statSync(path, encoding);
      return {
        exists: true,
        content: content
      };
    } catch (error) {
      return {
        exists: false,
        content: null
      };
    }
  }

  setRequestFileLength() {
    this.limitFileLength = parseInt(this.process.env.LIMIT_FILE_MB);
  }

  getRequestFileLength() {
    return this.limitFileLength;
  }
}

module.exports = Storage;