const Base = require('./Base');

class LoginService extends Base {
  Login = require('../../app/Login');

  constructor(request, response) { super(request, response); }
}

module.exports = LoginService;