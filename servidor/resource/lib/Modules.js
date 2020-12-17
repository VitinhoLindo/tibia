const Variables    = require('./Variables');


class Modules extends Variables {
  os           = require('os');
  fs           = require('fs');
  process      = require('process');
  http         = require('http');
  https        = require('https');
  crypto       = require('crypto');
  express      = require('express');
  bodyparser   = require('body-parser');
  Collection   = require('../util/Collection');
  UUID         = require('../util/UUID');
  Mailer       = require('nodemailer');
  JWT          = require('../util/JWT');
  CustomRegExp = require('./RegExp');
  interface    = require('../interface')

  constructor() { super(); }
}

module.exports = Modules;