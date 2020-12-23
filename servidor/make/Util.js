const Modules = require('./Modules')

class Util extends Modules {
  constructor() { super(); }

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

  valueUpper(value = '') {
    let first = value.substr(0, 1);
    let last  = value.substr(1);

    return `${first.toUpperCase()}${last.toLowerCase()}`;
  }

  getName(name = '') {
    let value = '';
    name = name.split(/-/g);

    for(let n of name) {
      value += this.valueUpper(n);
    }

    return value;
  }

  getControllerName(name = '') {
    name = this.getName(name);

    return `${name}Controller`;
  }

  getServiceName(name = '') {
    name = this.getName(name);

    return `${name}Service`;
  }

  getApiName(name = '') {
    name = this.getName(name);

    return `${name}Api`;
  }

  getResourceName(name = '') {
    name = this.getName(name);

    return `${name}Resource`;
  }

  getModelName(name = '') {
    name = this.getName(name);

    return `${name}Model`;
  }

  getPoliceName(name = '') {
    name = this.getName(name);

    return `${name}Police`;
  }
}

module.exports = Util;