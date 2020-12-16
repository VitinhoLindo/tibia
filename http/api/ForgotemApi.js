const { Router } = require('express');
const route = Router();
const ForgotemController = require('../controller/ForgotemController');

route.options('/', (request, response) => {
  ForgotemController.using(request, response).option();
});

route.get('/', (request, response) => {
  ForgotemController.using(request, response).get();
});

route.put('/', (request, response) => {
  ForgotemController.using(request, response).put();
});

route.post('/', (request, response) => {
  ForgotemController.using(request, response).post();
});

route.delete('/', (request, response) => {
  ForgotemController.using(request, response).delete();
});

module.exports = {
  route: '/forgotem',
  use: route
};