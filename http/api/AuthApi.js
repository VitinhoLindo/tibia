const { Router } = require('express');
const route = Router();
const AuthController = require('../controller/AuthController');

route.options('/', (request, response) => {
  AuthController.using(request, response).option();
});

route.get('/', (request, response) => {
  AuthController.using(request, response).get();
});

route.put('/', (request, response) => {
  AuthController.using(request, response).put();
});

route.post('/', (request, response) => {
  AuthController.using(request, response).post();
});

route.delete('/', (request, response) => {
  AuthController.using(request, response).delete();
});

module.exports = {
  route: '/auth',
  use: route
};