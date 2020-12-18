const BaseModelSql = require('./BaseModelSql');

class Person extends BaseModelSql {
  table = 'person';

  fields = [
    'id',
    'user_id',
    'server_id',
    'name',
    'created_at',
    'updated_at'
  ];

  encrypt = [];

  hash = [];

  timestamp = true;

  relation = {
    user: require('./User'),
    server: require('./Server')
  };

  constructor() { super(); }

  user() {
    return this.belongsTo(this.relation.user, 'user_id');
  }

  server() {
    return this.belongsTo(this.relation.server, 'server_id');
  }
}

module.exports = Person;