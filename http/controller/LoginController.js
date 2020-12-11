const LoginService = require('../service/LoginService')

class LoginController extends LoginService {
  constructor(request, response) { super(request, response) }

  static using(request, response) {
    return new LoginController(request, response);
  }

  async option() {
    return this.defaultResponseJSON();
  }

  async get() {
    try {
      // let JWT = new (this.app.JWT)();

      // let jwt = await JWT.issuer(this.request.socket.localAddress)
      //                    .setTime({ expMinute: 5 })
      //                    .subject(this.request.socket.remoteAddress)
      //                    .generate(this.app);

      // let logins = await Login.get();
      // return this.defaultResponseJSON({ result: { data: logins.toArrayJSON(), jwt: [jwt, _jwt] } });
    } catch (error) {
      console.log(error);
      return this.sendError(error);
    }
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

module.exports = LoginController;