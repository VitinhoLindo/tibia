const BaseModelSql = require('./BaseModelSql');

class Forgotem extends BaseModelSql {
  table = 'forgotem';

  fields = []

  relation = {}

  timestamp = true;

  constructor() { super(); }

}

module.exports = Forgotem;