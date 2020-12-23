const Base = require('./Base');
const { } = require('../../resource/fields');

class NpcResource extends Base {
  model          = require('../Npc');
  police         = require('../police/NpcPolice');
  authentication = true;

  constructor(request, response) {
    super(request, response);
    this.singularLabel('NPC_SINGULAR_LABEL');
    this.pluralLabel('NPC_PLURAL_LABEL');
  }

  async fields() {
    return [];
  }

  static make(request, response) {
    return new NpcResource(request, response);
  }
}

module.exports = NpcResource;