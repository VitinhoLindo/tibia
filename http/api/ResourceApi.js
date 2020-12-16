const { Router } = require('express');
const route = Router();
const ResourceController = require('../controller/ResourceController');

route.options('/', (request, response) => {
  ResourceController.using(request, response).option();
});

route.get('/', (request, response) => {
  ResourceController.using(request, response).get();
});

route.put('/', (request, response) => {
  ResourceController.using(request, response).put();
});

route.post('/', (request, response) => {
  ResourceController.using(request, response).post();
});

route.delete('/', (request, response) => {
  ResourceController.using(request, response).delete();
});

module.exports = {
  route: '/resource',
  use: route
};