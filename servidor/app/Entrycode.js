const BaseModelSql = require('./BaseModelSql');

class Entrycode extends BaseModelSql {
  table = 'entrycode';

  fields = [
    'id',
    'login',
    'code',
    'usaged_at',
    'created_at',
    'updated_at'
  ];

  encrypt = [];

  hash = [];

  timestamp = true;

  relation = {};

  constructor() { super(); }
}

module.exports = Entrycode;