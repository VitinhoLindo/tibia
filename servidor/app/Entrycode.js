const BaseModelSql = require('./BaseModelSql');

class Entrycode extends BaseModelSql {
  table = 'entrycode';

  fields = [
    'id',
    'login_id',
    'code',
    'usaged_at',
    'created_at',
    'updated_at'
  ];

  encrypt = [];

  hash = [];

  timestamp = true;

  relation = {
    login: require('./Login')
  };

  constructor() { super(); }

  login() {
    return this.belongsTo(this.relation.login, 'login_id');
  }
}

module.exports = Entrycode;