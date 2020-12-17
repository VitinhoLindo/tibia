const Base = require('./Base');

class LoginService extends Base {
  login = require('../../app/Login');
  entrycode = require('../../app/Entrycode');

  minCodeLength = 100000;
  maxCodeLength = 999999;
  
  constructor(request, response) { super(request, response) }

  async sendLoginCode(email, code) {
    try {
      await this.app.sendMail({
        from: email,
        subject: 'Solicitação de login',
        text: '',
        html: '',
        fileContent: 'utf8',
        replace: {
          type: 'html',
          regexp: '@code@',
          value: code
        },
        pathFile: this.app.path.publicMailerDir('loginCode.html')
      });
    } catch (error) {
      throw { code: 500, message: 'failure in send e-mail', result: { error: { login: 'failure in send e-mail' } } }
    }
  }

  async sendCode(email, senha) {
    try {
      let login = await this.login.where({ column: 'email', value: this.app.hash(email) }).first();
      
      if (!login) throw { code: 400, message: 'bad request', result: { error: { login: 'login ou senha incorreto' } } };
      if (login.senha != senha) throw { code: 400, message: 'bad request', result: { error: { login: 'email ou senha incorreto' } } };

      let entrycode = await login.entrycode();
      entrycode     = entrycode.whereNot({ column: 'usaged_at' }).first();
      
      if (entrycode) {
        entrycode.usaged_at = new Date();
        await entrycode.save();
        return await this.sendCode(email, senha);
      }

      let code = this.app.randomNumber(this.minCodeLength, this.maxCodeLength);

      entrycode = await this.entrycode.insert({
        login: login.id,
        code: code
      });

      await this.sendLoginCode(email, entrycode.code);
      return this.defaultResponseJSON();
    } catch (error) {
      if (error.result) error.result = await this.ecp_dcp_value(error.result, 'encrypt');
      throw error;
    }
  }

  async singIn(email, senha, code) {
    try {
      let login = await this.login.where({ column: 'email', value: email }).first();
      if (!login) throw { code: 400, message: 'bad request', result: { error: { login: 'login ou senha incorreto' } } };

      if (login.senha != senha) throw { code: 400, message: 'bad request', result: { error: { code: 'email ou senha incorreto' } } };

      let entrycode = await login.entrycode();
      entrycode     = entrycode.whereNot({ column: 'usaged_at' }).first();

      if (!entrycode || entrycode.code != code) throw { code: 400, message: 'bad request', result: { error: { code: 'codigo incorreto' } } };

      let jwt = await this.app.JWT.instance()
        .setHeader()
        .setTime({ expMinute: 5 })
        .subject(login.id)
        .generate(this.app);

      entrycode.usaged_at = new Date();
      await entrycode.save();
      this.app.save(this.request.socket.remoteAddress, { auth: jwt });

      return this.defaultResponseJSON({ result: await this.ecp_dcp_value({ auth: jwt }, 'encrypt') });
    } catch (error) {
      if (error.result) error.result = await this.ecp_dcp_value(error.result, 'encrypt');
      throw error;
    }
  }
}

module.exports = LoginService;