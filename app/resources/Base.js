const express = require('express');
const http = require('../../http');

class Base {
  request = express.request;
  response = express.response;
  app = http();

  page = { 
    class: 'form-table',
    singular: '',
    plural: ''
  };

  constructor(request, response) {
    this.request = request;
    this.response = response;
    this.app = request.getApp();
    this.build();
  }

  build() {
    let singular = this.constructor.name;
    singular = `${singular[0].toUpperCase()}${singular.substr(1).toLowerCase()}`;

    let plural = singular;

    this.page.singular = singular;
    this.page.plural = plural;
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
}

module.exports = Base;