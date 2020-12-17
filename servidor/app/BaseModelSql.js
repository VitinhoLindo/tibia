const OrmMysql = require('../resource/orm/mysql');

class BaseModel extends OrmMysql {
  constructor() { super(); }
}

module.exports = BaseModel;