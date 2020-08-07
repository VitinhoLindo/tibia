const { Router }        = require('express');
const SectionController = require('./SectionController');
const route             = Router();

route.get('/', async (request, response) => {
    let sectionController = new SectionController(request);
    let sectionData       = await sectionController.getSectionData();

    response.json(sectionData || {});
    response.end();
});

module.exports = route;