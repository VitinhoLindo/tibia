const { Router } = require('express');
const route = Router();
const SyncController = require('../controller/SyncController');

route.options('/', (request, response) => {
  SyncController.using(request, response).option();
});

route.get('/', (request, response) => {
  SyncController.using(request, response).get();
});

route.post('/', (request, response) => {
  SyncController.using(request, response).post();
});

module.exports = {
  route: '/sync',
  use: route
};