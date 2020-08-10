const { Router } = require('express');
const route      = Router();

route.use('/js',      require('../controllers/route/javascript') );
route.use('/css',     require('../controllers/route/css')        );
route.use('/ico',     require('../controllers/route/ico')        );
route.use('/',        require('../controllers/route/html')       );
route.use('/section', require('../controllers/route/section')    );
route.use('/npc',     require('../controllers/route/npc')        );

module.exports = route;