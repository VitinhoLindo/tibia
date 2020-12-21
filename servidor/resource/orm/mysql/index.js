const Collection = require('../../util/Collection');
const Client = require('./client');
const Build = require('./build');
const Model = require('./model')

class OrmMysql extends Model {
  client = new Client();
  build = new Build();

  constructor() { super(); }

  async use(func = '', type = 'encrypt' || 'hash') {
    if (!this[type]) return this;
    if (typeof func !== 'function') throw `arugment func is not Function`;
    let fields = this[type];

    for(let field of fields)
      this[field] = await func(this[field]);

    return this;
  }

  async find(id = 0) {
    if (id == undefined || id == null) throw `field id ${id} is not interable`;
    if (id.constructor.name !== 'Number') throw 'field to find is not Number';
    
    return await this.where({ column: 'id', value: id }).first();
  }

  static async find(id) {
    let model = new this();
    return await model.find(id);
  }

  whereNot(arg = { column: '' }) {
    this.build.setWhereNot(arg);
  }

  static whereNot(arg = { column: '' }) { 
    let model = new this();
    model.whereNot(arg);
    return model;
  }

  where(arg = { column: '', comparison: '', value: '' }) {
    this.build.setWhere(arg);
    return this;
  }

  static where(arg = { column: '', comparison: '', value: '' }) {
    let model = new this();
    return model.where(arg);
  }

  select(...args) {
    this.build.setSelect(args);
    return this;
  }

  static select(...args) {
    let model = new this();
    for(let arg of args) model.select(arg);
    return model;
  }

  join(arg = { table: '', target: '', field: '', fieldTarget: '' }) {
    this.build.setJoin(arg);
    return this;
  }

  static join(arg = { table: '', target: '', field: '', fieldTarget: '' }) {
    let model = new this;
    return model.join(arg);
  }

  async belongsTo(model, field) {
    try {
      return await model.find(this[field]);
    } catch (error) {
      return null;
    }
  }

  belongsToMany(model, field) {
    return model.where({ column: 'id', value: this[field] }).get();
  }

  hasMany(model, field) {
    return model.where({ column: field, value: this.id }).get();
  }

  async get() {
    let query  = this.build.selectQuery(this.table);
    let values = await this.client.executeQuery(query);

    return new Collection(values, this.constructor);
  }

  static async first() {
    let model = new this();
    return model.first();
  }

  async first() {
    let values = await this.get();
    return values.first();
  }

  async last() {
    let values = await this.get();
    return values.last();
  }

  static async last() {
    let model = new this();
    return model.last();
  }

  static async get() {
    let model = new this();
    return await model.get();
  }

  async insert(data) {
    let query = this.build.insertQuery(this.table, data, this.timestamp);
    let result = await this.client.executeQuery(query);
    data.id = result.insertId;
    return Collection.instance([data], this.constructor).first();
  }

  static async insert(data) {
    let model = new this();
    return await model.insert(data);
  }

  async save() {
    let data = this.toJSON();
    let query     = '';

    if (data.id)
      query = this.build.updateQuery(this.table, data, this.timestamp);
    else 
      query = this.build.insertQuery(this.table, data, this.timestamp);

    let result = await this.client.executeQuery(query);
    if (!data.id) 
      data.id = result.insertId;
    for(let key in data) this[key] = data[key];
    return this;
  }

  async delete() {
    let query  = this.build.deleteQuery(this.table, this.toJSON());
    await this.client.executeQuery(query);
    return true;
  }
}

module.exports = OrmMysql;