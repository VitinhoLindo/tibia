const Variables  = require('./Variables');
const Collection = require('../util/Collection');
const UUID       = require('../util/UUID');
const JWT        = require('../util/JWT');

class Modules extends Variables {
  os         = require('os');
  fs         = require('fs');
  process    = require('process');
  http       = require('http');
  https      = require('https');
  crypto     = require('crypto');
  express    = require('express');
  bodyparser = require('body-parser');
  Collection = Collection;
  UUID       = new UUID();
  JWT        = JWT;

  constructor() { super(); }
}

module.exports = Modules;