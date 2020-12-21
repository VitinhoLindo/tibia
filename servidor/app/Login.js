const BaseModelSql = require('./BaseModelSql');

class Login extends BaseModelSql {
  table = 'login';

  fields = [
    'id',
    'login',
    'user_id',
    'senha',
    'created_at',
    'updated_at'
  ]

  timestamp = true;

  relation = {
    forgotem: require('./Forgotem'),
    entrycode: require('./Entrycode'),
    user: require('./User')
  }

  constructor() { super(); }

  user() {
    return this.belongsTo(this.relation.user, 'user_id');
  }

  forgotem() {
    return this.hasMany(this.relation.forgotem, 'login_id');
  }

  entrycode() {
    return this.hasMany(this.relation.entrycode, 'login_id');
  }
}

module.exports = Login;