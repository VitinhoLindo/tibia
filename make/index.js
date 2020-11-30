const files = {
  '--controller': {
    controller: {
      path: './http/controller/@value@Controller.js',
      content: `const BaseController = require('./BaseController');\nconst @value@Service = require('../service/@value@Service');\n\nclass @value@Controller extends BaseController {\n  constructor(request, response) { super(request, response) }\n\n  static using(request, response) {\n    return new @value@Controller(request, response);\n  }\n\n  async option() {\n    return this.defaultResponseJSON();\n  }\n\n  async get() {\n    return this.defaultResponseJSON();\n  }\n\n  async post() {\n    return this.defaultResponseJSON();\n  }\n\n  async put() {\n    return this.defaultResponseJSON();\n  }\n\n  async delete() {\n    return this.defaultResponseJSON();\n  }\n\n}\n\nmodule.exports = @value@Controller;`
    },
    service: {
      path: './http/service/@value@Service.js',
      content: `class @value@Service {\n  constructor() {}\n}\n\nmodule.exports = @value@Service;`
    },
    api: {
      path: './http/api/@value@Api.js',
      content: `const { Router } = require('express');\nconst route = Router();\nconst @value@Controller = require('../controller/@value@Controller');\n\nroute.options('/', (request, response) => {\n  @value@Controller.using(request, response).option();\n});\n\nroute.get('/', (request, response) => {\n  @value@Controller.using(request, response).get();\n});\n\nroute.put('/', (request, response) => {\n  @value@Controller.using(request, response).put();\n});\n\nroute.post('/', (request, response) => {\n  @value@Controller.using(request, response).post();\n});\n\nroute.delete('/', (request, response) => {\n  @value@Controller.using(request, response).delete();\n});\n\nmodule.exports = {\n  route: '/@route@',\n  use: route\n};`
    }
  }
}


class Make {
  fs       = require('fs');
  process  = require('process');
  os       = require('os');
  crypto   = require('crypto');
  commands = [];

  constructor() {}

  async readCommands() {
    if (this.process.argv.length <= 2) throw 'pass arguments to make';

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
    
      default: return { status: false };
    }
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