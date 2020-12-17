class CustomRegExpOption {
  regexp  = '';
  value   = '';
  flag    = 'g';
  toReplace = '';

  constructor() {}
}

class CustomRegExp extends CustomRegExpOption {
  constructor(arg = new CustomRegExpOption) {
    super();
    this.regexp    = arg.regexp;
    this.value     = arg.value;
    this.flag      = arg.flag;
    this.toReplace = arg.toReplace;
  }

  replace() {
    let value = this.value.replace(new RegExp(this.regexp, this.flag), this.toReplace);
    return value;
  }

  static instance(arg = new CustomRegExpOption) {
    return new CustomRegExp(arg);
  }
}

module.exports = CustomRegExp;