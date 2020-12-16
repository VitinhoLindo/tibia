const ForgotemService = require('../service/ForgotemService');

class ForgotemController extends ForgotemService {
  constructor(request, response) { super(request, response) }

  static using(request, response) {
    return new ForgotemController(request, response);
  }

  async option() {
    return this.defaultResponseJSON();
  }

  async get() {
    return this.defaultResponseJSON();
  }

  async post() {
    try {
      let all = this.all();

      try {
        all = await this.ecp_dcp_value(all, 'decrypt');
      } catch (error) {
        throw { code: 500, message: 'failure in decrypt or encrypt data', result: { expiredCrypto: true } };
      }

      let validator = this.Validator.make(all, {
        login: 'required|email',
        code : 'interger',
        p : 'string',
        c : 'string'
      });

      if (validator.fails()) {
        let model = validator.modelResponse();
        model.result = await this.ecp_dcp_value(model.result, 'encrypt');
        throw model;
      }

      if (!all.code) {
        return await this.sendCode(all.login);
      }
      
      else if (all.code && !all.p && !all.c) {
        await this.validateCode(all.login, all.code);
        return this.defaultResponseJSON();
      }

      else if (all.code && all.p && all.c) {
        return await this.changePass(all.login, all.code, all.p, all.c);
      }

      else {
        return this.defaultResponseJSON({ code: 400, message: 'bad request' });
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

module.exports = ForgotemController;