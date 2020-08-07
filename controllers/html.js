const { Router } = require('express');
const route      = Router();

route.get('/', (request, response) => {
  response.sendFile(`${request.__dirname}/public/html/index.html`);
});

module.exports = route;