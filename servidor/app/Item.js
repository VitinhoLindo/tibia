const BaseModelSql = require('./BaseModelSql');

class Item extends BaseModelSql {
  table = 'item';

  fields = [
    'id',
    'imagem_id',
    'name',
    'created_at',
    'updated_at'
  ];

  encrypt = [];

  hash = [];

  timestamp = true;

  relation = {
    file: require('./File'),
    npcsell: require('./NpcSell'),
    npcbuy: require('./NpcBuy')
  };

  constructor() { super(); }

  image() {
    return this.belongsTo(this.relation.file, 'imagem_id');
  }

  sell() {
    return this.hasMany(this.relation.npcsell, 'item_id');
  }

  buy() {
    return this.hasMany(this.relation.npcbuy, 'item_id');
  }
}

module.exports = Item;