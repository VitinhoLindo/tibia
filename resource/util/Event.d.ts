import { EventEmitter } from 'events';

interface EventPrintOption {
  message: [];
  color:? String;
}

class Event extends EventEmitter {

  emit(event: 'print', arg: [EventPrintOption]): Boolean;

  on(event: 'print', arg: [EventPrintOption]): this;
}

export = Event;