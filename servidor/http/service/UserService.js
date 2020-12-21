const Base = require('./Base');

class UserService extends Base {
  loginModel = require('../../app/Login');
  userModel = require('../../app/User');
  profileModel = require('../../app/File');

  constructor(request, response) { super(request, response) }

  async getLogin(login_id) {
    return this.loginModel.find(login_id);
  }

  // salva o cpf informado na requisição
  async setCpf(login, user, cpf) {
    let _lastcpf = '';
    try {
      // decripta o campo de cpf informado na requisição
      cpf = await this.decrypt(cpf);
    } catch (error) {
      throw { code: 500, message: 'failure in decrypt or encrypt data', result: { expiredCrypto: true } };          
    }

    // obtem numeros do cpf, expected: 999.999.999-99, extracted: 99999999999
    cpf = this.app.extractNumber(cpf);
    if (cpf.length != 11) throw { code: 400, message: 'bad request', result: { error: { cpf: 'invalid cpf' } } };

    // se não tiver usuário cria e vincula ao login
    if (!user) {
      user = await this.userModel.insert({
        cpf: await this.app.encrypt(cpf.toString()),
      });

      login.user_id = user.id;
      await login.save();
      return;
    }

    // se o cpf antigo for igual ao mesmo não modifica o banco.
    _lastcpf = await this.app.decrypt(user.cpf);
    if (_lastcpf == cpf) return;

    // se não for igual ao cpf antigo salva o cpf novo.
    // melhorar para enviar código da alteração
    user.cpf = await this.app.encrypt(cpf);
    user.save();
    return;
  }

  async setProfile(login, user, file) {
    if (!user) return;
    let validator = this.Validator.make(file, {
      binary: 'required|string',
      formatBinary: 'required|string',
      mimeType: 'required|string',
      name: 'required|string',
      size: 'required|interger'
    });

    if (validator.fails()) {
      throw { code: 400, message: 'bad request' };
    }
    
    if (file.size > this.app.getRequestFileLength()) 
      throw { code: 400, message: 'overload', result: { error: { profile: 'file size is not supported' } }};

    let buffer                    = Buffer.from(file.binary, 'hex');
    let [fileName, fileExtension] = file.name.split(/\./);
    let [typeFile, typeExtension] = file.mimeType.split(/\//g);

    let profile;

    try {
      profile = await user.profile();
    } catch (error) {};

    if (!profile) profile = new (this.profileModel);

    profile.name     = (await this.app.encrypt(fileName)) + `.${typeExtension}`;
    profile.mimetype = file.mimeType;
    profile.size     = buffer.byteLength;
    profile.binary   = buffer;

    await profile.save();

    user.profile_id = profile.id;
    await user.save();
  }
}

module.exports = UserService;