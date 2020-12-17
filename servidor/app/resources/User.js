const Base = require('./Base');
const UserModel = require('../User');
const { } = require('../../resource/fields');

class User extends Base {
  model = UserModel;

  autentication = true;

  constructor(request, response) {
    super(request, response);
    this.singularLabel('LABEL_USER_RESOURCE');
    this.pluralLabel('LABEL_USERS_RESOURCE');
  }

  async fields() {
    return [];
  }

  static make(request, response) {
    return new User(request, response);
  }
}

module.exports = User;