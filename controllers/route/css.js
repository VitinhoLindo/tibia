const { Router } = require('express');
const route      = Router();
const CssController = require('../CssController');

route.get('/:file', (request, response) => {
  (new CssController(request, response))._send();
});

module.exports = route;