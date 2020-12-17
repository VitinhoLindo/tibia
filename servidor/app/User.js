const BaseModelSql = require('./BaseModelSql');

class User extends BaseModelSql {
  table = 'user';

  fields = [
    'id'
  ];

  encrypt = [];

  hash = [];

  timestamp = false;

  relation = {};

  constructor() { super(); }
}

module.exports = User;