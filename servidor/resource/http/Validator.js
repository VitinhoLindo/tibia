class ValidatorOption {
  failed = false
  rule = '';
  message = '';
}

const isArray = (value) => {
  const _isArray = (_value) => {
    if (_value.constructor.name == 'Array') return true;
    return false;
  }
  var bool = false, count = 1, end = 4, autoBreak = false;

  while (!bool) {
    if (count == end) break;
    if (autoBreak) break;

    switch (count) {
      case 1:
        if (!dataExists(value))
          autoBreak = true;
        break;
      case 2:
        if (isString(value))
          try {
            value = JSON.parse(value);
          } catch (error) {
            autoBreak = true;
          }
        break;
      case 3:
        if (_isArray(value)) bool = true;
        break;
      default: break;
    }

    count++;
  }

  return bool;
}

const isObject = (value) => {
  if (!dataExists()) return false;
  if (isString(value)) try {
    value = JSON.parse(value);
  } catch (error) {}
  return (_value.constructor.name == 'Object') ? true : false;
}

const dataExists = (value) => {
  return (((value || null) == null)) ? false : true;
}

const lenValue = (rule, value, opt) => {
  if (!isString(rule)) return false;
  if (!dataExists(value)) return false;

  if (value.constructor.name == 'Number') {
    value = value.toString();
  }

  let _len = value.length;
  if (_len == undefined) return false;

  let exec = /\d+/g.exec(rule);
  if (!exec) return false;
  exec = parseInt(exec);

  switch (opt) {
    case 'min':
      if (_len < exec) return false;
      else return true;
    case 'max':
      if (_len > exec) return false;
      else return true;
    default:
      return false;
  }
}

const isUrlEncode = (value) => {
  if (!isString(value)) return false;
  if (/data\:image\/\w+\;base64\,\s/g.test(data) == true) return true;
  else return false;
}

const isString = (value) => {
  if (!dataExists(value)) return false;
  if (typeof value == 'string') return true;
  return false;
}

const isNumber = (value) => {
  if (!dataExists(value)) return false;
  if (/\d+$/.test(value) == false) return false;
  return true;
}

const isDate = (value) => {
  if (!dataExists(value)) return false;
  var count = 1, end = 4;
  let bool = false;

  while (!bool) {
    if (count == end) break;
    switch (count) {
      case 1:
        if (value.constructor.name == 'Date') bool = true;
        break;
      case 2:
        if (!isString(value)) break;
        if (/\d+\-\d+-\d+T\d+:\d+:\d+\.\d+Z$/.test(value) == true) bool = true;
        break;
      case 3:
        let date = new Date(value);
        if (date != 'Invalid Date') bool = true;
        break;
    }
    count++;
  }

  return bool;
}

const isEmail = (value) => {
  if (!isString(value)) return false;

  if (/([a-zA-Z0-9\.\_\-]+\@[a-zA-Z]+\.[a-zA-Z]{3})/.test(value) || /[a-zA-Z0-9\.\_\-]+\@[a-zA-Z]+\.[a-zA-Z]{3}\.[a-zA-Z]{2}/.test(value)) return true;
  else return false;
}

class Validator {
  failed      = false;
  rule        = [];
  message     = [];
  failedField = [];

  constructor(opt = new ValidatorOption()) {
    this.failed      = opt.failed;
    this.rule        = opt.rule;
    this.message     = opt.message;
    this.failedField = opt.failedField;
  }

  fails() {
    return this.failed;
  }

  modelResponse() {
    let model = {
      code: 400,
      message: 'Bad Request',
      result: {
        error: {
        }
      }
    }

    for (let field of this.failedField) {
      if (!this.message[field]) continue;

      model.result.error[field] = this.message[field];
    }

    return model;
  }

  static validate(data, rules = undefined | []) {
    for (let rule of rules) {
      if (rule == 'required')             {
        if (!dataExists(data))              return { failed: true, rule: rule };
      } else if (rule == 'string')        {
        if (!isString(data))                return { failed: true, rule: rule, ruleMessage: `not string` };
      } else if (rule == 'interger')      {
        if (!isNumber(data))                return { failed: true, rule: rule, ruleMessage: `not interger` }
      } else if (rule == 'email')         {
        if (!isEmail(data))                 return { failed: true, rule: rule, ruleMessage: `not email format` };
      } else if (rule == 'array')         {
        if (!isArray(data))                 return { failed: true, rule: rule };
      } else if (rule == 'object')        {
        if (!isObject(data))                return { failed: true, rule: rule };
      } else if (/^min\:\d+$/.test(rule)) {
        if (!lenValue(rule, data, 'min'))   return { failed: true, rule: rule };
      } else if (/^max\:\d+$/.test(rule)) {
        if (!lenValue(rule, data, 'max'))   return { failed: true, rule: rule };
      } else if (rule == 'url-encode')    {
        if (!isUrlEncode(data))             return { failed: true, rule: rule };
      } else if (rule == 'datetime')      {
        if (!isDate(data))                  return { failed: true, rule: rule };
      }
    }

    return { failed: false };
  }

  static errorMessage(field, rule, message) {
    let _message = `this field '${field}' is @complement@`;

    if (message) { return _message.replace(/\@complement\@/g, message); }
    else { return _message.replace(/\@complement\@/g, rule); }
  }

  static validateArgs(data, opt, message) {
    if ((data || null) == null || data.constructor.name != 'Object') throw "first argument is not type object to make function";
    if ((opt || null) == null || opt.constructor.name != 'Object') throw "second argument is not type object to make function";
  }

  static make(data = {}, opt = {}, message = {}) {
    let controller = {
      failed: false,
      rule: [],
      message: {},
      failedField: []
    };

    this.validateArgs(data, opt, message);
    for (let field in opt) {
      let opts = opt[field].split(/\|/g);

      if (
        (data[field] || null) == null && 
        opts.indexOf('required') < 0
      ) continue;
      let result = this.validate(data[field], opts);

      if (!result.failed) continue;
      
      controller.failed = result.failed;
      controller.rule.push(result.rule);
      controller.failedField.push(field);

      if (message[field] && message[field][result.rule]) {
        controller.message[field] = message[field][result.rule];
        continue;
      }

      controller.message[field] = this.errorMessage(field, result.rule, result.ruleMessage);
    }

    return new Validator(controller);
  }
}

module.exports = Validator;