class Collection {
  all = [];

  constructor(values = [], model) {
    this.build(values, model);
  }

  build(values = [], model) {
    if (!model) {
      this.all = values;
      return;
    }

    for (let value of values) {
      let _model = new model();

      for(let key in value)
        _model[key] = value[key];

      this.all.push(_model);
    }
  }

  static instance(value, model) {
    return new Collection(value, model);
  }

  info() {
    let len = this.count();
    return {
      min: 0,
      max: (len - 1 < 0) ? 0 : len - 1
    };
  }

  count() {
    return this.all.length;
  }

  first() {
    let info = this.info();
    return this.all[info.min];
  }

  last() {
    let info = this.info();
    return this.all[info.max];
  }

  toArray() {
    let arrayData = [];
    for(let value of this.all) arrayData.push(value);
    return arrayData;
  }

  toArrayJSON() {
    let arrayData = [];
    for(let value of this.all) arrayData.push(value.toJSON());
    return arrayData;
  }

  static instance(value, model) {
    return new Collection(value, model);
  }

  add(value) {
    this.all.push(value);
    return this;
  }

  whereNot(arg = { column: '' }) {
    let values = [];

    for (let value of this.all) {
      if ((value[arg.column] || null) == null) values.push(value);
    }

    return new Collection(values);
  }

  where(arg = { column: '', comparison: '', value: '' }) {
    if (!arg.comparison) arg.comparison = '==';
    let values = [];

    for (let value of this.all) {
      if (eval(`${value[arg.column]} ${arg.comparison} ${arg.value}`)) values.push(value);
    }

    return new Collection(values);
  }
}

module.exports = Collection;