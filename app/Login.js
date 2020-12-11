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

  constructor() { super(); }
}

module.exports = Login;