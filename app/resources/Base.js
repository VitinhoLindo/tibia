const BaseHttp = require('../../resource/http/BaseHttp')

class Base extends BaseHttp {
  model = null;
  autentication = false;

  page = { 
    class: 'form-table',
    singular: '',
    plural: '',
    resource: ''
  };

  constructor(request, response) {
    super(request, response);
    this.build();
  }

  build() {
    let singular = this.constructor.name;
    this.page.resource = this.constructor.name.toLowerCase();
    singular = `${singular[0].toUpperCase()}${singular.substr(1).toLowerCase()}`;
    let plural = singular;


    this.page.singular = singular;
    this.page.plural   = plural;
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