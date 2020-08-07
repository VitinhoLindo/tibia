const { App } = require('./app');

(async () => {
  const Server = new App(__dirname);
  await Server.setConfig();
  Server.listen();
})();