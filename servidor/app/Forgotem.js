const BaseModelSql = require('./BaseModelSql');

class Forgotem extends BaseModelSql {
  table = 'forgotem';

  fields = [
    'id',
    'login_id',
    'code',
    'usaged_at',
    'created_at',
    'updated_at'
  ]

  relation = {
    login: require('./Login')
  }

  timestamp = true;

  constructor() { super(); }

  login() {
    return this.belongsTo(this.relation.login, 'login_id');
  }
}

module.exports = Forgotem;