const BaseModelSql = require('./BaseModelSql');

class Location extends BaseModelSql {
  table = 'location';

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

module.exports = Location;