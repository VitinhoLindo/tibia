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
}

module.exports = Build;