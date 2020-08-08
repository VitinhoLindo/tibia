const { Router } = require('express');
const route      = Router();

route.use('/js', require('../controllers/javascript'));
route.use('/css', require('../controllers/css'));
route.use('/ico', require('../controllers/ico'));
route.use('/', require('../controllers/html'));
route.use('/section', require('../controllers/section'));

module.exports = route;