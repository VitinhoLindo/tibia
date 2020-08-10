const { Router }   = require('express');
const route        = Router();
const JsController = require('../JsController');

route.get('/:file', (request, response) => {
  (new JsController(request, response))._send();
});

module.exports = route;