const Commands = require('./Commands');

class Build extends Commands {
  constructor() { super(); }

  static instance() {
    return new Build();
  }
  
  async build() {
    try {
      this.readCommands();
      this.executeCommand();
    } catch (error) {
      this.error(error);
    }
  }
}

module.exports = Build;