const LoginService = require('../service/LoginService');

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
      let cache = this.app.find(this.request.socket.remoteAddress);
      if (!cache && !cache.auth) throw { code: 404, message: 'don\'t found' };
      return this.defaultResponseJSON({ result: { auth: cache.auth } });
    } catch (error) {
      return this.sendError(error);
    }
  }

  async post() {
    let all = this.all();

    try {
      try {
        all = await this.ecp_dcp_value(all, 'decrypt');
      } catch (error) {
        throw { code: 500, message: 'failure in decrypt or encrypt data', result: { expiredCrypto: true } };        
      }
      
      let validator = this.Validator.make({
        login: 'required|string',
        senha: 'required|string',
        code:  'interger'
      })

      if (validator.fails()) {
        let model = validator.modelResponse();
        model.result = this.ecp_dcp_value(model.result, 'encrypt');
        throw model;
      }

      if (!all.code) {
        return await this.sendCode(all.login, all.senha);
      } else if (all.code) {
        return await this.singIn(all.login, all.senha, all.code);
      } else {
        return this.defaultResponseJSON({ 
          code: 400, 
          message: 'bad request', 
          result: { 
            error: { 
              login: 'login is required',
              senha: 'senha is required'
            }
          }
        });
      }

    } catch (error) {
      return this.sendError(error);
    }
  }

  async put() {
    return this.defaultResponseJSON();
  }

  async delete() {
    return this.defaultResponseJSON();
  }

}

module.exports = LoginController;