const { validate } = require('../../resource/http/Validator');
const UserService = require('../service/UserService');

class UserController extends UserService {
  constructor(request, response) { super(request, response) }

  static using(request, response) {
    return new UserController(request, response);
  }

  async option() {
    return this.defaultResponseJSON();
  }

  async get() {
    let all = this.all();
    try {
      let login;
      try {
        login = await this.login();
        login = await this.getLogin(login);  
      } catch (error) {
        throw { code: 403, message: 'unauthorized', result: { authentication: true } };
      }
      let user = await login.user();
      let cpf = await this.app.decrypt(user.cpf);
      let response = {};

      if (!user)
        return this.defaultResponseJSON();
         
      user.profile = await user.profile();
      switch (all.profile || 'true') {
        case 'false': break;
        case 'true':
        default:
          response.profile = {
            name: user.profile.name,
            mimeType: user.profile.mimetype,
            binary: this.app.binaryToHex(user.profile.binary),
            binaryFormat: 'hex',
            size: user.profile.size
          }
          break;
      }

      switch (all.cpf || 'true') {
        case 'false': break;
        case 'true':
        default:
          response.cpf = await this.encrypt(cpf);
          break;
      }

      return this.defaultResponseJSON({ 
        result: response
      });
    } catch (error) {
      return this.sendError(error);
    }
  }

  async post() {
    try {
      let all = this.all();
      let login;

      try {
        // obtem login do jwt
        login = await this.login();
        login = await this.getLogin(login);
      } catch (error) { throw { code: 403, message: 'unauthorized', result: { authentication: true } }; }

      // verifica os dados informados na requisição
      let validator = this.Validator.make({
        cpf: 'required|string',
        profile: 'object'
      });

      if (validator.fails()) throw validator.modelResponse();

      let user = null;
      try {
        user = await login.user();
      } catch (error) { }

      // adiciona o cpf informado na requisição no usuário
      await this.setCpf(login, user,  all.cpf);
      await this.setProfile(login, user, all.profile);

      return this.defaultResponseJSON();
    } catch (error) {
      console.log(error);
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

module.exports = UserController;