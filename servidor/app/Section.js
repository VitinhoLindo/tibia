const BaseModelSql = require('./BaseModelSql');

class Section extends BaseModelSql {
  table = 'section';

  fields = [
    'id',
    'person_id',
    'experience',
    'time',
    'created_at',
    'updated_at',
    'deleted_at'
  ];

  encrypt = [];

  hash = [];

  timestamp  = true;
  softdelete = true;

  relation = {
    person: require('./Person')
  };

  constructor() { super(); }

  person() {
    return this.belongsTo(this.relation.person, 'person_id');
  }

  
}

module.exports = Section;