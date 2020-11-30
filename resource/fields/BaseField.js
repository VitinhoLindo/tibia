class Base {
  response = {};

  constructor() { }

  style(value = {}) {
    let response = this.get();

    response.shared.style = Object.assign({}, response.shared.style, value);

    this.set(response);
    return this;
  }

  using(values = {}) {
    let response = this.get();
    for (let key in values) { response.shared.using[key] = values[key]; }
    this.set(response);
    return this;
  }

  class(name = '') {
    let response = this.get();
    response.shared.using.class = name;
    this.set(response);
    return this;
  }

  protect(using = '') {
    let protectType = { hash: 'hash', encrypt: 'encrypt' }
    if (!protectType[using]) throw `protect type is not supported ${using}`;

    let response = this.get();
    response.shared.protect = using;
    this.set(response);
    return this;
  }

  rules(value = '') {
    let response = this.get();
    response.shared.rules = value;
    this.set(response);
    return this;
  }

  set(value) {
    this.response = value;
  }

  get() {
    return this.response;
  }
}

module.exports = Base;