const Storage = require('./Storage');

class Cache extends Storage {
  constructor() { super(); }

  save(key, value) {
    if (!this[key]) this[key] = {};

    this[key] = Object.assign(this[key], value);
  }

  find(key) {
    if (!this[key]) return null;
    return this[key];
  }
}

module.exports = Cache;