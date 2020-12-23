const BaseHttp = require('../../resource/http/BaseHttp')

class Base extends BaseHttp {
  model         = null;
  autentication = false;
  police        = require('../police/BasePolice');

  page = { 
    class: 'form-table',
    singular: '',
    plural: ''
  };

  constructor(request, response) {
    super(request, response);
  }

  changeClass(value) {
    let classes = ['form-table', 'form-itens'];

    if (classes.indexOf(value) >= 0) this.page.class = value;
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