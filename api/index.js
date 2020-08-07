const { Router } = require('express');
const route      = Router();

route.use('/js', require('../controllers/javascript'));
route.use('/css', require('../controllers/css'));
route.use('/', require('../controllers/html'));
route.use('/section', require('../controllers/section'));

module.exports = route;