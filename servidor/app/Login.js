const BaseModelSql = require('./BaseModelSql');

class Login extends BaseModelSql {
  table = 'login';

  fields = [
    'id',
    'login',
    'senha',
    'created_at',
    'updated_at'
  ]

  timestamp = true;

  relation = {
    forgotem: require('./Forgotem'),
    entrycode: require('./Entrycode')
  }

  constructor() { super(); }

  forgotem() {
    return this.hasMany(this.relation.forgotem, 'login');
  }

  entrycode() {
    return this.hasMany(this.relation.entrycode, 'login');
  }
}

module.exports = Login;