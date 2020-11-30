var route = {
    name: '@name@',
    dirController: 'controllers',
    controllerName: '@name@Controller',
    controllerContent: `const BaseController = require('./BaseController');\n\n`+
    `class @controller@ extends BaseController {\n  constructor( request, response) {\n` + 
    `    super( request, response);\n  }\n}\n\n` + 
    `module.exports = @controller@;`,
    dirRoute: `route`,
    routeName: '@name@',
    routeContent: `const { Router } = require('express');\n` +
    `const @mcontroller@ = require('../@controller@');\n` +
    `const route = Router();\n\n//route.get('/', (request, response) => {\n//  (new @mcontroller@(request, response));\n//});\n\n` + 
    `\n\n//route.post('/', (request, response) => {\n//  (new @mcontroller@(request, response));\n//});\n\n` +
    `\n\n//route.put('/', (request, response) => {\n//  (new @mcontroller@(request, response));\n//});\n\n` +
    `\n\n//route.delete('/', (request, response) => {\n//  (new @mcontroller@(request, response));\n//});\n\n` +
    `module.exports = route;`
}


class Make {
  process = require('process');
  os      = require('os');
  fs      = require('fs');
  args = {
    bin: this.process.argv[0],
    file: this.process.argv[1],
    command: this.process.argv[2],
    commandFile: this.process.argv[3]
  };
  plataformDir = '';

  __dirname = ''
  constructor(dirname) {
    this.__dirname = dirname.replace(/(\/|\\)make/g, '');
    this.setPlataform();
  }

  setPlataform() {
    switch(this.os.platform()) {
      case 'android':
      case 'linux':
        this.plataformDir = '/';
        break;
      case 'windows':
        this.plataformDir = '\\';
        break;
    }
  }

  async saveFileDir(args = [{ dirFile: '', content: '', encoding: '' }]) {
    for (let index in args) {
      let arg = args[index];

      await this.fs.writeFileSync(arg.dirFile, arg.content, { encoding: arg.encoding });
    }
  }

  getRouteDir() {
    return `${this.__dirname}${this.plataformDir}${route.dirController}${this.plataformDir}${route.dirRoute}${this.plataformDir}${route.routeName}.js`;
  }

  getControllerDir() {
    return `${this.__dirname}${this.plataformDir}${route.dirController}${this.plataformDir}${route.controllerName}.js`;
  }

  setRoute() {
    if (this.args.commandFile == undefined) return true;
    this.args.commandFile = this.args.commandFile.replace(/\d+/, '');

    let name = '';
    for (let x = 0; x < this.args.commandFile.length; x++)
      if (x == 0) name += this.args.commandFile[x].toUpperCase();
      else        name += this.args.commandFile[x];
    this.args.commandFile = this.args.commandFile.toLowerCase();

    route.name              = this.args.commandFile;
    route.controllerName    = route.controllerName.replace(/@name@/g, name);
    route.controllerContent = route.controllerContent.replace(/@controller@/g, route.controllerName);
    route.routeName         = route.routeName.replace(/@name@/g, this.args.commandFile);

    let stringControllerName = '';
    for (let x = 0; x < route.controllerName.length; x++) {
        if (x == 0) stringControllerName += route.controllerName[x].toLowerCase();
        else        stringControllerName += route.controllerName[x];
    }

    route.routeContent      = route.routeContent.replace(/@controller@/g, route.controllerName).replace(/@mcontroller@/g, stringControllerName);

    this.saveFileDir([
        { dirFile: this.getRouteDir(), content: route.routeContent, encoding: 'utf-8' },
        { dirFile: this.getControllerDir(), content: route.controllerContent, encoding: 'utf-8' }
    ]);
  }

  runCommand() {
    switch (this.args.command) {
      case 'route':
        return this.setRoute();
      default:
        break;
    }
  }
}

(() => {
  (new Make(__dirname)).runCommand();
})();