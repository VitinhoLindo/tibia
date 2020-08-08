const { Router } = require('express');
const route      = Router();

route.get('/:file', (request, response) => {
  response.sendFile(`${request.__dirname}/public/ico/${request.params.file}`, (err) => {
    response.status(404);
    response.end();
  });
});

module.exports = route;