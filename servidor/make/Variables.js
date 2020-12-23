class Variables {
  paths     = require('./Paths');
  dir       = './'

  commands  = [];
  arguments = [
    { command: '\x1b[32m--controller=[\x1b[33mrouter\x1b[32m]', message: '\x1b[37mcreate new controller and service and api' },
    { command: '\x1b[32m--set \x1b[34m--set=\x1b[33menv', message: '\x1b[37mcreate new .env-example file and .env-example' },
    { command: '\x1b[32m--hash=[\x1b[33mvalue\x1b[32m]', message: '\x1b[37mcreate new hash using sha256 algorithm'},
    { command: '\x1b[32m--model-sql=[\x1b[33mmodel\x1b[32m]', message: '\x1b[37mcreate new model using mysql database'},
    { command: '\x1b[32m--resource-sql=[\x1b[33mmodel\x1b[32m]', message: '\x1b[37mcreate resource and model using mysql database'},
    { command: '\x1b[32m--resource=[\x1b[33mresource\x1b[32m]', message: '\x1b[37mcreate resource' },
    { command: '\x1b[32m--police=[\x1b[33mpolice\x1b[32m]', message: '\x1b[37mcreate police' },
    { command: '\x1b[32m--encrypt=[\x1b[33mdata\x1b[32m]', message: '\x1b[37mencrypt data using secret and key in .env file cipher aes-192-cbc' },
    { command: '\x1b[32m--decrypt=[\x1b[33mdata\x1b[32m]', message: '\x1b[37mdecrypt data using secret and key in .env file cipher aes-192-cbc' }
  ]

  cryptoKeys      = { }
  hashAlg         = 'sha256';
  cryptoAlg       = 'aes-192-cbc';
  cryptoSalt      = 'salt';
  cryptoSaltRange = 24;

  constructor() {}
}

module.exports = Variables;