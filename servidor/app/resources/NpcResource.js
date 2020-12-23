const Base = require('./Base');
const { } = require('../../resource/fields');

class NpcResource extends Base {
  model         = require('../Npc');
  autentication = true;
  police        = require('../police/NpcPolice');

  constructor(request, response) {
    super(request, response);
    this.singularLabel('');
    this.pluralLabel('');
  }

  async fields() {
    return [];
  }

  static make(request, response) {
    return new NpcResource(request, response);
  }
}

module.exports = NpcResource;