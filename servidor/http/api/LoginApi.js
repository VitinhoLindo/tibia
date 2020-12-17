const { Router } = require('express');
const route = Router();
const LoginController = require('../controller/LoginController');

route.options('/', (request, response) => {
  LoginController.using(request, response).option();
});

route.get('/', (request, response) => {
  LoginController.using(request, response).get();
});

route.put('/', (request, response) => {
  LoginController.using(request, response).put();
});

route.post('/', (request, response) => {
  LoginController.using(request, response).post();
});

route.delete('/', (request, response) => {
  LoginController.using(request, response).delete();
});

module.exports = {
  route: '/login',
  use: route
};