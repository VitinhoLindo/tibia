const files = {
  '--controller': {
    controller: {
      path: './http/controller/@value@Controller.js',
      content: `const @value@Service = require('../service/@value@Service');\n\nclass @value@Controller extends @value@Service {\n  constructor(request, response) { super(request, response) }\n\n  static using(request, response) {\n    return new @value@Controller(request, response);\n  }\n\n  async option() {\n    return this.defaultResponseJSON();\n  }\n\n  async get() {\n    return this.defaultResponseJSON();\n  }\n\n  async post() {\n    return this.defaultResponseJSON();\n  }\n\n  async put() {\n    return this.defaultResponseJSON();\n  }\n\n  async delete() {\n    return this.defaultResponseJSON();\n  }\n\n}\n\nmodule.exports = @value@Controller;`
    },
    service: {
      path: './http/service/@value@Service.js',
      content: `const Base = require('./Base');\n\nclass @value@Service extends Base {\n  constructor(request, response) { super(request, response) }\n}\n\nmodule.exports = @value@Service;`
    },
    api: {
      path: './http/api/@value@Api.js',
      content: `const { Router } = require('express');\nconst route = Router();\nconst @value@Controller = require('../controller/@value@Controller');\n\nroute.options('/', (request, response) => {\n  @value@Controller.using(request, response).option();\n});\n\nroute.get('/', (request, response) => {\n  @value@Controller.using(request, response).get();\n});\n\nroute.put('/', (request, response) => {\n  @value@Controller.using(request, response).put();\n});\n\nroute.post('/', (request, response) => {\n  @value@Controller.using(request, response).post();\n});\n\nroute.delete('/', (request, response) => {\n  @value@Controller.using(request, response).delete();\n});\n\nmodule.exports = {\n  route: '/@route@',\n  use: route\n};`
    }
  },
  '--set': {
    'env': {
      path: './.env'
    },
    'env-example': {
      path: './.env-example',
      content: `PROTOCOL=http\nHOST=localhost\nPORT=80\n\nSLL_CERT=\nSSL_KEY=\n\nMAXREQUEST=50\nRESETINTERVALMINUTE=1\nREQUEST_TIMEOUT=8000\n\nMYSQL_HOST=localhost\nMYSQL_PORT=3306\nMYSQL_USER=\nMYSQL_PASS=\nMYSQL_DB=\nMYSQL_TIMEOUT=15000\n\nMYSQL_SSL_CA=\nMYSQL_SSL_CERT=\nMYSQL_SSL_KEY=\n\nKEY=@KEY@\nIV=@IV@\n`
    }
  },
  '--model-sql': {
    path: './app/@value@.js',
    content: `const BaseModelSql = require('./BaseModelSql');\n\nclass @value@ extends BaseModelSql {\n  table = '@table@';\n\n  fields = [\n    'id'\n  ];\n\n  encrypt = [];\n\n  hash = [];\n\n  timestamp = false;\n\n  relation = {};\n\n  constructor() { super(); }\n}\n\nmodule.exports = @value@;` 
  },
  '--resource-sql': {
    path: './app/resources/@value@.js',
    content: `const Base = require('./Base');\nconst @value@Model = require('../@value@');\nconst { } = require('../../resource/fields');\n\nclass @value@ extends Base {\n  model = @value@Model;\n\n  constructor(request, response) {\n    super(request, response);\n    this.singularLabel('');\n    this.pluralLabel('');\n  }\n\n  async fields() {\n    return [];\n  }\n\n  static make(request, response) {\n    return new @value@(request, response);\n  }\n}\n\nmodule.exports = @value@;`
  }
}


class Make {
  fs        = require('fs');
  process   = require('process');
  os        = require('os');
  crypto    = require('crypto');
  commands  = [];
  arguments = [
    { command: '\x1b[32m--controller=[\x1b[33mrouter\x1b[32m]', message: '\x1b[37mcreate new controller and service and api' },
    { command: '\x1b[32m--set', message: '\x1b[34m--set=\x1b[33menv \x1b[37mcreate new .env-example file and .env-example' },
    { command: '\x1b[32m--hash=[\x1b[33mvalue\x1b[32m]', message: '\x1b[37mcreate new hash using sha256 algorithm'},
    { command: '\x1b[32m--model-sql=[\x1b[33mmodel\x1b[32m]', message: '\x1b[37mcreate new model using mysql database'},
    { command: '\x1b[32m--resource-sql=[\x1b[33mmodel\x1b[32m]', message: '\x1b[37mcreate resource and model using mysql database'}
  ]

  constructor() {}

  showArguments() {
    for(let arg of this.arguments) {
      console.log(`\n\n${arg.command}\n\n    ${arg.message}`);
    }
  }

  async readCommands() {
    if (this.process.argv.length <= 2) return this.showArguments();

    for(let x = 2; x < this.process.argv.length; x++) {
      let command = {};

      let [ c, v ] =this.process.argv[x].split('=');
      command[c] = v;
      this.commands.push(command);
    }
  }

  validateCommand(cmd) {
    switch (cmd) {
      case '--controller': return { status: true, command: 'controller' };
      case '--set':        return { status: true, command: 'set' };
      case '--hash':       return { status: true, command: 'hashable' };
      case '--model-sql':  return { status: true, command: 'modelSql' };
      case '--resource-sql':  return { status: true, command: 'resourceSql' };

      default: return { status: false };
    }
  }

  toHex(value = '') {
    return Buffer.from(value).toString('hex');
  }

  hash(value = '') {
    let hash = this.crypto.createHash('sha256');

    hash.update(value);
    return hash.digest('hex');
  }

  randomNumber(min = 0, max = 0) {
    if (min > max) {
      let _max = max;
      max = min;
      min = _max;
    }

    let decimalHouse = 10;

    while(max > decimalHouse) {
      decimalHouse += 10;
    }

    let rand;

    do {
      rand = Math.floor(Math.random() * decimalHouse);
    } while (rand < min || rand > max);

    return rand;
  }

  randomString(len = 10) {
    let characters = 'abcdefghijklmnopqrstuvxywz0123456789!@#$%¨&*_-+=§{[]}ºª;:,><.°';
    let randomString = '';

    for(let x = 0; x < len; x++) {
      let index = this.randomNumber(0, characters.length - 1);
      randomString += characters[index];
    }

    return randomString;
  }

  getIv() {
    return this.crypto.randomBytes(16);
  }

  async setEnv() {
    let cmd = '--set', key = this.randomString(200), iv = this.getIv();

    key = this.hash(key);
    iv  = this.toHex(iv);

    let env = files[cmd]['env-example'].content.replace(/@KEY@/g, key).replace(/@IV@/g, iv);
    let example = files[cmd]['env-example'].content.replace(/@KEY@/g, '').replace(/@IV@/g, '');

    await Promise.all([
      this.fs.writeFileSync(
        files[cmd]['env-example'].path,
        example,
        { encoding: 'utf-8' }
      ),
      this.fs.writeFileSync(
        files[cmd]['env'].path,
        env,
        { encoding: 'utf-8' }
      )
    ]);
  }

  async modelSql(cmd = '--model-sql', value = '') {
    if (!value) throw `invalid value to command ${cmd}`;

    value = `${value[0].toUpperCase()}${value.substr(1).toLowerCase()}`;
    let table = value.toLowerCase();

    await this.fs.writeFileSync(
      files[cmd].path.replace(/@value@/g, value),
      files[cmd].content.replace(/@value@/g, value).replace(/@table@/g, table),
      { encoding: 'utf-8' }
    )
  }

  async resourceSql(cmd = '--resource-sql', value = '') {
    if (!value) throw `invalid value to command ${cmd}`;

    let _v = `${value[0].toUpperCase()}${value.substr(1).toLowerCase()}`;

    await this.modelSql('--model-sql', _v);

    await this.fs.writeFileSync(
      files[cmd].path.replace(/@value@/g, _v),
      files[cmd].content.replace(/@value@/g, _v),
      { encoding: 'utf-8' }
    )
  }

  async set(cmd = '--set', value = '') {
    if (!value) throw `invalid value to command ${cmd}`;

    switch (value) {
      case 'env': return await this.setEnv();
      default: throw `invalid value to command ${cmd}`;
    }
  }

  async hashable(cmd = '--hash', value = '') {
    if (!value) throw `invalid value to command ${cmd}`;

    console.log(this.hash(value));
  }

  async controller(cmd = '--controller', value = '') {
    if (!value) throw `invalid value to command ${cmd}`;

    let route = value.toLowerCase();
        value = `${value[0].toUpperCase()}${value.substr(1).toLowerCase()}`;

    await Promise.all([
      this.fs.writeFileSync(files[cmd].controller.path.replace(/@value@/g, value), files[cmd].controller.content.replace(/@value@/g, value), { encoding: 'utf-8' }),
      this.fs.writeFileSync(files[cmd].service.path.replace(/@value@/g, value), files[cmd].service.content.replace(/@value@/g, value), { encoding: 'utf-8' }),
      this.fs.writeFileSync(files[cmd].api.path.replace(/@value@/g, value), files[cmd].api.content.replace(/@value@/g, value).replace(/@route@/g, route), { encoding: 'utf-8' })
    ]);
  }

  async executeCommand() {
    for(let value of this.commands) {
      for(let key in value) {
        let cmd = this.validateCommand(key);
        try {
          if (!cmd.status) throw `invalid command ${key}`;
          
          await this[cmd.command](key, value[key]);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
  
  async build() {
    try {
      await this.readCommands();
    } catch (error) {
      console.log(error);
    }

    await this.executeCommand();
  }
}

(async () => {
  const make = new Make();

  make.build();
})();