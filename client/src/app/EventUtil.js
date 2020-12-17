import Util from './Util'

class EventUtil extends Util {
  constructor() { super(); }

  validateOnArgs(listener, callfunc, callback) {
    if (!listener) throw 'event.on: listener is not defined';
    if (!callfunc) throw 'event.on: function is not defined';
    if (!callback) throw 'event.on: callback is not defined';
    if (this.typeOf(listener) !== 'String') 
      throw 'event.on: listiner is not type \'String\'';
    if (typeof callfunc != 'function') 
      throw 'event.on: function is not \'function\'';
    if (typeof callback != 'function')
      throw 'event.on: callback is not a \'function\'';
  }

  validateOffArgs(listener, pid) {
    if (!listener) throw 'event.off: listener is not defined';
    if (!pid)      throw 'event.off: pid is not defined';
    if (this.typeOf(listener) !== 'String')
      throw 'event.off: listiner is not type \'String\'';
    if (this.typeOf(pid) !== 'Number') 
      throw 'event.off: pid is not type \'Number\'';
  }

  callbackError(error, callback) {
    console.error(error);
    if (typeof callback == "function") return callback(error, null);
    else throw "event.on: callback is not a function";
  }

  getListener(listener) {
    return this.events[listener] || null;
  }

  setListener(listener, pid, func) {
    this.events[listener][pid] = func;
  }

  unsetListener(listener, pid) {
    if (!this.events[listener][pid]) console.error(`unsetListener: ${listener} error, ${pid} is not defined`);
    else delete this.events[listener][pid]
  }

  getListenerSymbols(listener) {
    return Object.keys(this.getListener(listener) || {});
  }
}

export default EventUtil