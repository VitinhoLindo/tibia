const { Router }        = require('express');
const SectionController = require('../SectionController');
const route             = Router();

route.get('/', async (request, response) => {
    (new SectionController(request, response)).getSectionData();
});

route.post('/', async (request, response) => {
    (new SectionController(request, response)).newSection();
});

module.exports = route;