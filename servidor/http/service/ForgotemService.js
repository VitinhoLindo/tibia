const Base = require('./Base');

class ForgotemService extends Base {
  login    = require('../../app/Login');
  forgotem = require('../../app/Forgotem');

  minCodeLength = 100000;
  maxCodeLength = 999999;

  constructor(request, response) { super(request, response) }

  async getLogin(email) {
    let register = await this.login.where({ column: 'email', value: this.app.hash(email) }).first();
    if (!register) throw { code: 404, message: 'don\'t found', result: { error: { login: 'email not exists' } } };
    return register;
  }

  async getSolicitationForgotem(value = new (this.login)) {
    let values = await value.forgotem();
    return values.whereNot({ column: 'usaged_at' });
  }

  getForgotemData(value = new (this.login)) {
    let code = this.app.randomNumber(this.minCodeLength, this.maxCodeLength);
    return {
      login_id: value.id,
      code : code
    }
  }

  async sendCode(email) {
    try {
      let login     = await this.getLogin(email);
      let forgotens = await this.getSolicitationForgotem(login); 
  
      if (!forgotens.count()) {
        forgotens = await this.forgotem.insert(
          this.getForgotemData(login)
        );
      } else {
        forgotens = forgotens.first();
      }
      
      try {
        await this.app.sendMail({
          from: email,
          subject: 'Alterar senha',
          text: '',
          html: '',
          fileContent: 'utf8',
          replace: {
            type: 'html',
            regexp: '@code@',
            value: forgotens.code
          },
          pathFile: this.app.path.publicMailerDir('forgotemCode.html')
        });
      } catch (error) {
        throw { code: 500, message: 'failure in send e-mail', result: { error: { login: 'failure in send e-mail' } } }
      }

      return this.defaultResponseJSON();
    } catch (error) {
      if (error.result) error.result = await this.ecp_dcp_value(error.result, 'encrypt');
      throw error;
    }
  }

  async validateCode(email, code) {
    try {
      let login     = await this.getLogin(email);
      let forgotens = await this.getSolicitationForgotem(login);
      forgotens = forgotens.where({ column: 'code', value: code });

      if (forgotens.count()) {
        return [login, forgotens];
      } else {
        throw { code: 400, message: 'bad request', result: { error: { code: 'código incorreto' } } };
      }
    } catch (error) {
      if (error.result) error.result = await this.ecp_dcp_value(error.result, 'encrypt');
      throw error;
    }
  }

  async changePass(email, code, senha, confirm) {
    let [login, forgotens] = await this.validateCode(email, code);

    try {
      if (senha == confirm) {
        login.senha = senha;
        await login.save();
      } else {
        throw { code: 400, message: 'bad request', result: { error: { senha: 'senhas não conferem' } } };        
      }

      let forgotem = forgotens.first();
      forgotem.usaged_at = new Date();
      await forgotem.save(); 

      return this.defaultResponseJSON();
    } catch (error) {
      if (error.result) error.result = await this.ecp_dcp_value(error.result, 'encrypt');
      throw error;
    }
  }
}

module.exports = ForgotemService;