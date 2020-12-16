class Model {
  table     = '';
  fields    = [];
  timestamp = false;
  encrypt   = [];
  hash      = [];
  relation  = {}
  client    = null;
  build     = null;

  toJSON() {
    let model = new Model();
    let json = {};
    let keys = Object.keys(model);

    for(let key of Object.keys(this)) {
      if (keys.indexOf(key) >= 0) continue;
      json[key] = this[key] || null;
    }

    return json;
  }
}

module.exports = Model;