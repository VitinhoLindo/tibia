const { Router }    = require('express');
const route         = Router();
const NpcController = require('../NpcController');

route.post('/', (request, response) => {
  (new NpcController(request, response)).newNpc();
});

module.exports = route;