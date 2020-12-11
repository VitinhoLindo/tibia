const Base = require('./Base');
const Login = require('../Login');
const { } = require('../../resource/fields');

class Login extends Base {
  model = Auth;

  constructor(request, response) {
    super(request, response);
    this.singularLabel(this.app);
    this.pluralLabel('');
  }

  async fields() {
    return [];
  }

  static make(request, response) {
    return new Login(request, response);
  }
}

module.exports = Login;