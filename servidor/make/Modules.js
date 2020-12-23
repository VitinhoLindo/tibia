const Variables = require('./Variables') 

class Modules extends Variables {
  fs        = require('fs');
  process   = require('process');
  os        = require('os');
  crypto    = require('crypto');

  constructor() { super(); }
}

module.exports = Modules;