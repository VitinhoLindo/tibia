const { Router } = require('express');
const route = Router();
const FileController = require('../controller/FileController');

route.options('/', (request, response) => {
  FileController.using(request, response).option();
});

route.get('/', (request, response) => {
  FileController.using(request, response).get();
});

route.put('/', (request, response) => {
  FileController.using(request, response).put();
});

route.post('/', (request, response) => {
  FileController.using(request, response).post();
});

route.delete('/', (request, response) => {
  FileController.using(request, response).delete();
});

module.exports = {
  route: '/file',
  use: route
};