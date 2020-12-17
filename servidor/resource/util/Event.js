const { EventEmitter } = require('events');

class Event extends EventEmitter {
  constructor() {
    super();

    this.setMaxListeners(Infinity);
  }
}

module.exports = Event;