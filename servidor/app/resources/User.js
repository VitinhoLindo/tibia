const Base = require('./Base');
const { } = require('../../resource/fields');

class User extends Base {
  model  = require('../User');
  police = require('../police/UserPolice')

  constructor(request, response) {
    super(request, response);
    this.singularLabel('');
    this.pluralLabel('');
  }

  async fields() {
    return [];
  }

  static make(request, response) {
    return new User(request, response);
  }
}

module.exports = User;