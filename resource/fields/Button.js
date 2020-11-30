const Base = require('./BaseField'); 

class Button extends Base {
  constructor() { super(); }

  static make(label) {
    let button = new Button();

    button.set({
      name: 'button-component',
      shared: {
        label: label,
        using: {
          class: 'button'
        }
      }
    });

    return button;
  }

  event(value = '') {
    let response = this.get();

    response.shared.event = value;
    this.set(response);
    return this;
  }

  action(value = '') {
    let response = this.get();

    if (!response.shared.action) response.shared.action = {};
    response.shared.action.actionName = value;

    this.set(response);
    return this;
  }

  path(value = '', method = '') {
    let response = this.get();
    method = method.toUpperCase();

    if (!response.shared.action) response.shared.action = {}; 
    response.shared.action.path = value;
    response.shared.action.method = method;

    this.set(response);
    return this;
  }

  class(value = '') {
    let classes = { danger: 'button-danger' };

    if (!classes[value]) throw `class button is not supported ${value}`;
    let response = this.get();

    response.shared.using.class = value;
    this.set(response);
    return this;
  }
}

module.exports = Button;