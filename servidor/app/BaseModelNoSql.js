const OrmMongoDB = require('../resource/orm/mongodb');

class BaseModel extends OrmMongoDB {
  constructor() { super(); }
}

module.exports = BaseModel;