const BaseModelSql = require('./BaseModelSql');

class NpcAccess extends BaseModelSql {
  table = 'npc_access';

  fields = [
    'id',
    'access_id',
    'npc_id',
    'created_at',
    'updated_at'
  ];

  encrypt = [];

  hash = [];

  timestamp = true;

  relation = {
    npc: require('./Npc'),
    access: require('./Access')
  };

  constructor() { super(); }

  npc() {
    return this.belongsTo(this.relation.npc, 'npc_id');
  }

  access() {
    return this.belongsTo(this.relation.access, 'access_id');
  }
}

module.exports = NpcAccess;