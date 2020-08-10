const { Router }     = require('express');
const route          = Router();
const HtmlController = require('../HtmlController');

route.get('/', (request, response) => {
  (new HtmlController(request, response))._send();
});

module.exports = route;