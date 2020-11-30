const Api = require('../api');
const Middlaware = require('../middleware');

const staticRoutes = {
  '/': 'publicHtmlDir',
  '/js': 'publicJsDir',
  '/css': 'publicCssDir',
  '/ico': 'publicIcoDir',
  '/image': 'publicImageDir',
  '/gif': 'publicGifDir',
  '/doc': 'publicDocDir',
  '/video': 'publicVideoDir'
};

module.exports = function (app = require('../index')(), server = require('express')()) {
  for(let route in staticRoutes) {
    let path = app.path[staticRoutes[route]]();
    server.use(route, app.express.static(path)); 
  }

  const defaultFunctions = (request, response, next) => {
    request.getApp = () => {
      return app;
    }

    next();
  }

  let middlaware = Middlaware.get();

  middlaware.setDefaultResponseHeader({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': false
  });

  middlaware.setMaxRequests(app.process.env.MAXREQUEST);
  middlaware.setTimeListenUsingMinute(app.process.env.RESETINTERVALMINUTE);
  middlaware.listen();  

  server.use(app.bodyparser.urlencoded({ extended: true }));
  server.use(app.bodyparser.json());
  server.use((i, s, n) => defaultFunctions(i, s, n))
  server.use((i, s, n) => middlaware.validate(i, s, n));

  for(let api of Api) server.use(api.route, api.use);
}