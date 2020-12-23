class BasePolice {
  constructor() {}

  static insert(user, model) {
    return true;
  }

  static view  (user, model) {
    return true;
  }

  static delete(user, model) {
    return true;
  }

  static update(user, model) {
    return true;
  }
}

module.exports = BasePolice;