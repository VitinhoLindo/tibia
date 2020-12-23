const Base = require('./Base');
const { } = require('../../resource/fields');

class PerfilResource extends Base {
  model          = require('../User');
  police         = require('../police/PerfilPolice');
  authentication = true;

  constructor(request, response) {
    super(request, response);
    this.singularLabel('PERFIL-APP-LABEL');
    this.pluralLabel('PERFIL-APP-LABEL');
  }

  async fields() {
    return [];
  }

  static make(request, response) {
    return new PerfilResource(request, response);
  }
}

module.exports = PerfilResource;