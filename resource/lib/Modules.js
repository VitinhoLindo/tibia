const Variables = require('./Variables');

class Modules extends Variables {
  os         = require('os');
  fs         = require('fs');
  process    = require('process');
  http       = require('http');
  https      = require('https');
  crypto     = require('crypto');
  express    = require('express');
  bodyparser = require('body-parser');

  constructor() { super(); }
}

module.exports = Modules;