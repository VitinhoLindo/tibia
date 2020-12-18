const BaseModelSql = require('./BaseModelSql');

class PersonAccess extends BaseModelSql {
  table = 'person_access';

  fields = [
    'id',
    'access_id',
    'person_id',
    'created_at',
    'updated_at'
  ];

  encrypt = [];

  hash = [];

  timestamp = true;

  relation = {
    access: require('./Access'),
    person: require('./Person')
  };

  constructor() { super(); }

  access() {
    return this.belongsTo(this.relation.access, 'access_id');
  }

  person() {
    return this.belongsTo(this.relation.person, 'person_id');
  }
}

module.exports = PersonAccess;