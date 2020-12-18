const BaseModelSql = require('./BaseModelSql');

class User extends BaseModelSql {
  table = 'user';

  fields = [
    'id',
    'cpf',
    'login_id',
    'profile_id',
    'created_at',
    'updated_at'
  ];

  encrypt = [];

  hash = [];

  timestamp = true;

  relation = {
    login: require('./Login'),
    file : require('./File')
  };

  constructor() { super(); }

  login() {
    return this.belongsTo(this.relation.login, 'login_id');
  }

  profile() {
    return this.belongsTo(this.relation.file, 'profile_id');
  }
}

module.exports = User;