const BaseModelSql = require('./BaseModelSql');

class Npc extends BaseModelSql {
  table = 'npc';

  fields = [
    'id',
    'profile_id',
    'location_id',
    'name',
    'created_at',
    'updated_at'
  ];

  encrypt = [];

  hash = [];

  timestamp = true;

  relation = {
    location: require('./Location'),
    file: require('./File')
  };

  constructor() { super(); }

  location() {
    return this.belongsTo(this.relation.location, 'location_id');
  }

  profile() {
    return this.belongsTo(this.relation.file, 'profile_id');
  }
}

module.exports = Npc;