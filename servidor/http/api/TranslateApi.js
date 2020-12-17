const { Router } = require('express');
const route = Router();
const TranslateController = require('../controller/TranslateController');

route.options('/', (request, response) => {
  TranslateController.using(request, response).option();
});

route.get('/', (request, response) => {
  TranslateController.using(request, response).get();
});

route.put('/', (request, response) => {
  TranslateController.using(request, response).put();
});

route.post('/', (request, response) => {
  TranslateController.using(request, response).post();
});

route.delete('/', (request, response) => {
  TranslateController.using(request, response).delete();
});

module.exports = {
  route: '/translate',
  use: route
};