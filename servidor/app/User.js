const BaseModelSql = require('./BaseModelSql');

class User extends BaseModelSql {
  table = 'user';

  fields = [
    'id',
    'cpf',
    'login_id',
    'profile_id',
    'user_authorization_id',
    'created_at',
    'updated_at'
  ];

  encrypt = [];

  hash = [];

  timestamp = true;

  relation = {
    login: require('./Login'),
    file : require('./File'),
    authorization: require('./UserAuthorization')
  };

  constructor() { super(); }

  login() {
    return this.hasMany(this.relation.login, 'user_id');
  }

  profile() {
    return this.belongsTo(this.relation.file, 'profile_id');
  }
}

module.exports = User;