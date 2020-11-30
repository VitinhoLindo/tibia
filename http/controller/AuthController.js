const BaseController = require('./BaseController');
const AuthService = require('../service/AuthService');

class AuthController extends BaseController {
  constructor(request, response) { super(request, response) }

  static using(request, response) {
    return new AuthController(request, response);
  }

  async option() {
    return this.defaultResponseJSON();
  }

  async get() {
    return this.defaultResponseJSON();
  }

  async post() {
    return this.defaultResponseJSON();
  }

  async put() {
    return this.defaultResponseJSON();
  }

  async delete() {
    return this.defaultResponseJSON();
  }

}

module.exports = AuthController;