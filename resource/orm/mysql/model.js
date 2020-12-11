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
    for(let key of Object.keys(model)) delete this[key];
    for(let key of Object.keys(this)) json[key] = this[key] || null;
    return json;
  }
}

module.exports = Model;