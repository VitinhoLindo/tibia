const { Router } = require('express');
const route = Router();
const UserController = require('../controller/UserController');

route.options('/', (request, response) => {
  UserController.using(request, response).option();
});

route.get('/', (request, response) => {
  UserController.using(request, response).get();
});

route.put('/', (request, response) => {
  UserController.using(request, response).put();
});

route.post('/', (request, response) => {
  UserController.using(request, response).post();
});

route.delete('/', (request, response) => {
  UserController.using(request, response).delete();
});

module.exports = {
  route: '/user',
  use: route
};