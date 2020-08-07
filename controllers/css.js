const { Router } = require('express');
const route      = Router();

route.get('/:file', (request, response) => {
  response.sendFile(`${request.__dirname}/public/css/${request.params.file}`, () => {});
  response.end();
});

module.exports = route;