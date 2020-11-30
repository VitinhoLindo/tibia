const Config = require('./config');

class Http extends Config {
  constructor() { super(); }
}

module.exports = function () {
  let dir = __dirname;
  console.log(dir);
};