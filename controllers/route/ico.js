const { Router }    = require('express');
const route         = Router();
const IcoController = require('../IcoController');

route.get('/:file', (request, response) => {
  (new IcoController(request, response))._send();
});

module.exports = route;