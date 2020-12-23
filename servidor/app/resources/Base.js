const BaseHttp = require('../../resource/http/BaseHttp')

class Base extends BaseHttp {
  model         = null;
  authentication = false;
  police        = require('../police/BasePolice');

  page = { 
    resource: 'panel-forms',
    singular: '',
    plural: ''
  };

  constructor(request, response) {
    super(request, response);
  }

  changeClass(value) {
    let resource = ['panel-forms', 'form-table', 'form-itens'];

    if (resource.indexOf(value) in resource) 
      this.page.resource = value;
  }

  singularLabel(value = '') {
    this.page.singular = value;
  }

  pluralLabel(value = '') {
    this.page.plural = value;
  }

  getPage() {
    return this.page;
  }

  async get() {

  }

  async post() {

  }

  async put() {

  }

  async delete() {

  }
}

module.exports = Base;