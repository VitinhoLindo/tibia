const { Router } = require('express');
const monitController = require('../MonitController');
const route = Router();

route.get('/', (request, response) => {
  (new monitController(request, response)).getMonit();
});



//route.post('/', (request, response) => {
//  (new monitController(request, response));
//});



//route.put('/', (request, response) => {
//  (new monitController(request, response));
//});



//route.delete('/', (request, response) => {
//  (new monitController(request, response));
//});

module.exports = route;