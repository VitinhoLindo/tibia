const Base = require('./Base');
const { } = require('../../resource/fields');

class UserResource extends Base {
  model          = require('../User');
  police         = require('../police/UserPolice');
  authentication = true;

  constructor(request, response) {
    super(request, response);
    this.singularLabel('USER_SINGULAR_LABEL');
    this.pluralLabel('USER_PLURAL_LABEL');
  }

  async fields() {
    return [];
  }

  static make(request, response) {
    return new UserResource(request, response);
  }
}

module.exports = UserResource;