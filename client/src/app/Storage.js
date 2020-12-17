import Event from './Event'

class Storage extends Event {
  constructor() { super(); }

  get(index, parser) {
    let item = this.storage.getItem(index);

    if (parser == 'json') {
      return JSON.parse(item);
    } else {
      return item;
    }
  }

  set(index, value, parser) {
    if (parser == 'json') {
      let item = this.get(index, parser);

      item = Object.assign(item || {}, value);
      this.storage.setItem(index, JSON.stringify(item));
    } else {
      this.storage.setItem(index, value);
    }
  }
}

export default Storage;