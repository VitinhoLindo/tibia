const Validate = require('./Validate');

class Commands extends Validate {
  constructor() { super(); }

  readCommands() {
    if (this.process.argv.length <= 2) return this.printArguments();
    this.dir = this.process.argv[1].replace(/\/make\/|\/make/g, '');

    for(let x = 2; x < this.process.argv.length; x++) {
      let [ c, v ] =this.process.argv[x].split('=');

      this.commands.push({
        command  : c,
        argument : v
      });
    }
  }

  executeCommand() {
    if (!this.commands) return this.printArguments();

    for(let value of this.commands) {

      let cmd = this.validateCommand(value.command);

      if (!cmd.status) {
        this.error(`invalid command ${value.command}`);
        continue;
      }

      try {
        this[cmd.func](value.command, value.argument);
      } catch (error) {
        this.error(error);        
      }
    }
  }
}

module.exports = Commands;