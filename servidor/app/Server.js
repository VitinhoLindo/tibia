const BaseModelSql = require('./BaseModelSql');

class Server extends BaseModelSql {
  table = 'server';

  fields = [
    'id',
    'name',
    'color',
    'pvp',
    'created_at',
    'updated_at'
  ];

  encrypt = [];

  hash = [];

  timestamp = true;

  relation = {};

  constructor() { super(); }
}

module.exports = Server;