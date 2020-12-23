const BaseModelSql = require('./BaseModelSql');

class UserAuthorization {
  static ID_ADMIN     = 1;
  static ID_MODERATOR = 2;
  static ID_USER      = 3;

  static ADMIN_LABEL     = '';
  static MODERATOR_LABEL = '';
  static USER_LABEL      = '';

  constructor() { }

  get() {
    return this.constructor.get();    
  }

  find(id) {
    return this.constructor.find(id);
  }
  
  static get() {
    let object = {};

    object[this.ID_ADMIN]     = this.ADMIN_LABEL;
    object[this.ID_MODERATOR] = this.MODERATOR_LABEL;
    object[this.ID_USER]      = this.USER_LABEL;

    return object;
  }

  static find(id) {
    let data = this.get();

    if (parseInt(id)) for(let key in data) {
      if (key != id) continue;
      return data[key];
    }
    else for(let key in data) {
      let _data = data[key];
      if (_data != id) continue;
      return _data;
    }
  }
}

module.exports = UserAuthorization;