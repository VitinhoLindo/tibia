const BasePolice = require('./BasePolice');

class UserPolice extends BasePolice {
  static authorization = require('../UserAuthorization');

  constructor() { super(); }

  static view(user, model) {
    try {
      if (
        user.user_authorization_id == this.authorization.ID_ADMIN ||
        user.user_authorization_id == this.authorization.ID_MODERATOR
      ) return true;
    } catch (error) { }
    return false;
  }

  static delete(user, model) {
    try {
      if (
        user.user_authorization_id == this.authorization.ID_ADMIN ||
        user.user_authorization_id == this.authorization.ID_MODERATOR
      ) return true;
    } catch (error) { }
    return false;
  }

  static update(user, model) {
    try {
      if (
        user.user_authorization_id == this.authorization.ID_ADMIN ||
        user.user_authorization_id == this.authorization.ID_MODERATOR
      ) return true;
    } catch (error) { }
    return false;
  }

  static insert(user, model) {
    try {
      if (
        user.user_authorization_id == this.authorization.ID_ADMIN ||
        user.user_authorization_id == this.authorization.ID_MODERATOR
      ) return true;
    } catch (error) { }
    return false;
  }
}

module.exports = UserPolice;