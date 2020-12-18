const BaseModelSql = require('./BaseModelSql');

class Access extends BaseModelSql {
  table = 'access';

  fields = [
    'id',
    'name',
    'created_at',
    'updated_at'
  ];

  encrypt = [];

  hash = [];

  timestamp = true;

  relation = {};

  constructor() { super(); }
}

module.exports = Access;