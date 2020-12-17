import EventUtil from './EventUtil'

class Event extends EventUtil {

  constructor() { super(); }

  validateListinerOrAdd(listener) {
    if (!this.getListener(listener)) this.events[listener] = {};
  }

  addNewsListener(listener, callfunc, callback) {
    let pid = null;
    do {
      pid = this.randomNumber(1, 9999999);
    } while (this.inArray(pid, this.getListenerSymbols()));

    this.setListener(listener, pid, callfunc);
    callback(null, pid);
  }

  on(listener, callfunc, callback) {
    try {
      this.validateOnArgs(listener, callfunc, callback);
      this.validateListinerOrAdd(listener);
      this.addNewsListener(listener, callfunc, callback);
    } catch (error) {
      if (callback) this.callbackError(error, callback);
      else throw error;
    }
  }

  off(listener, pid) {
    this.validateOffArgs(listener, pid);

    if (this.getListener(listener)) this.unsetListener(listener, pid);
    else throw `event.off: listen ${listener} is not defined`;
  }

  emit(listener, ...args) {
    let listeners = this.getListener(listener);

    if (this.typeOf(listeners) == 'Nullable') return;
    for(let listen in listeners) {
      try {
        listeners[listen].apply(null, args);
      } catch (error) {
        console.error(`event.emit: error in function \n\nlisten: ${listener}\npid: ${listen}`);
      }
    }
  }
}

export default Event;