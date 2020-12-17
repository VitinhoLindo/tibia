import Modules from './Modules'

class Util extends Modules {
  constructor() { super(); }

  typeOf(value) {
    if ((value || null) == null) return 'Nullable';
    return value.constructor.name;
  }

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

  arrayInfo(array = []) {
    return {
      initial: 0,
      final: (array.length) ? array.length - 1 : array.length
    }
  }

  sleep(time) {
    time = parseFloat(time) || 1;
    time *= 1000;
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(true);
      }, time);
    });
  }

  inArray(value, array = []) {
    return (array.indexOf(value) < 0)? false : true;
  }
}

export default Util;