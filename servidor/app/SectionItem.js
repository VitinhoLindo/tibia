const BaseModelSql = require('./BaseModelSql');

class SectionItem extends BaseModelSql {
  table = 'section_item';

  fields = [
    'id',
    'section_id',
    'item_id',
    'status',
    'created_at',
    'updated_at',
    'deleted_at'
  ];

  encrypt = [];

  hash = [];

  timestamp  = true;
  softdelete = true;

  relation = {
    section: require('./Section'),
    item: require('./Item')
  };

  constructor() { super(); }

  section() {
    return this.belongsTo(this.relation.section, 'section_id');
  }

  item() {
    return this.belongsTo(this.relation.item, 'item_id');
  }
}

module.exports = SectionItem;