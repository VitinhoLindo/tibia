const mysql2 = require('mysql2');

class Build {
  whereFields  = [];
  selectFields = [];
  joinFields   = [];
  
  constructor() {}

  set(value) {
    return mysql2.escape(value);
  }

  setWhereNot(arg = { column: '' }) {
    if (!arg.column) throw 'please inform column to whereNot function';

    this.whereFields.push(`${this.set(arg.column)} is Null`);
  }

  setWhere(arg = { column: '', value: '', comparison: '' }) {
    if (!arg.comparison) arg.comparison = '=';
    if (!arg.column) throw 'please inform column to where';
    if (!arg.value) throw 'plase inform valeu to where or use whereNot';

    this.whereFields.push(`\`${arg.column}\` ${arg.comparison} ${this.set(arg.value)}`);
  }

  setJoin(arg = { table: '', target: '', field: '', fieldTarget: '' }) {
    this.joinFields.push(`INNER JOIN \`${arg.target}\``+
      ` ON \`${arg.target}\`.\`${arg.fieldTarget}\` ` + 
      `= ` +
      `\`${arg.table}\`.\`${arg.field}\``
    );
  }

  getJoin() {
    let query = '';
    for(let join of this.joinFields)
      query += `${join} `;
    this.joinFields = [];
    return query;
  }

  getWhere() {
    let whereQuery = '';

    for(let index in this.whereFields) {
      if (index == 0)
        whereQuery += ` ${this.whereFields[index]}`
      else
        whereQuery += ` AND ${this.whereFields[index]}`
    }

    this.whereFields = [];
    return (whereQuery) ? `WHERE (${whereQuery})` : '';
  }

  setSelect(args) {
    this.selectFields = this.selectFields.concat(
      args.map(a => {
        if (/\./.test(a)) {
          let [table, column] = a.split(/\./g);
          return `\`${table}\`.${column == '*' ? '*' : `\`${column}\``}`;
        } else return `\`${a}\``;
      })
    );
  }

  getSelect() {
    let select = '';

    for (let index in this.selectFields) {
      if (index == 0)
        select += `${this.selectFields}`
      else
        select += `, ${this.selectFields}`
    }

    this.selectFields = [];
    return select ? ` ${select} `: ' * ';
  }

  selectQuery(table) {
    return `SELECT ${this.getSelect()} FROM \`${table}\` ${this.getJoin()} ${this.getWhere()};`;
  }

  buildData(data = {}) {
    let query = {
      fields: [],
      values: []
    }

    for(let field in data) {
      let value = mysql2.escape(data[field]);

      query.fields.push(`\`${field}\``);
      query.values.push(`${value}`);
    }

    return query;
  }

  timestampData(data = {}, timestamp = false) {
    if (timestamp) {
      if (!data.created_at) data.created_at = new Date();
      if (data.id)
        data.updated_at = new Date();
    }

    return data;
  }

  insertQuery(table = '', data = {}, timestamp = false) {
    data = this.timestampData(data, timestamp);
    let build = this.buildData(data);
    let query = {
      fields: '',
      values: '',
    }

    for(let index in build.fields) {
      let field = build.fields[index];
      let value = build.values[index];

      if (index != 0) {
        field = `, ${field}`;
        value = `, ${value}`;
      }

      query.fields += field;
      query.values += value;
    }

    return `INSERT INTO \`${table}\` (${query.fields}) VALUES (${query.values});`;
  }

  updateQuery(table = '', data = {}, timestamp = false) {
    data = this.timestampData(data, timestamp);
    const id = data.id;
    this.setWhere({ column: 'id', value: data.id });
    delete data.id;

    let build = this.buildData(data);
    let query = '';


    for(let index in build.fields) {
      let field  = build.fields[index];
      let value  = build.values[index];

      if (index == 0) { query += `SET ${field} = ${value}`; }
      else { query += `, ${field} = ${value}`; }
    }

    data.id = id;
    return [`UPDATE \`${table}\` ${query} ${this.getWhere()};`, data];
  }

  deleteQuery(table = '', data = {}) {
    for(let key in data) {
      let value = data[key];

      if (!value) continue;
      this.setWhere({ column: key, value: value });
    }

    return `DELETE FROM \`${table}\` ${this.getWhere()};`;
  }
}

module.exports = Build;