const BaseModelSql = require('./BaseModelSql');

class NpcBuy extends BaseModelSql {
  table = 'npc_buy';

  fields = [
    'id',
    'npc_id',
    'item_id',
    'value',
    'created_at',
    'updated_at'
  ];

  encrypt = [];

  hash = [];

  timestamp = true;

  relation = {
    npc: require('./Npc'),
    item: require('./Item')
  };

  constructor() { super(); }

  npc() {
    return this.belongsTo(this.relation.npc, 'npc_id');
  }

  item() {
    return this.belongsTo(this.relation.item, 'item_id');
  }
}

module.exports = NpcBuy;