class Collection {
  all = [];

  constructor(values = [], model) {
    let _values = [];
    for (let value of values) {
      let _model = new model();

      for(let key in value) {
        _model[key] = value[key];
      }

      _values.push(_model);
    }

    this.all = _values;
  }

  info() {
    let len = this.all.length;
    return {
      min: 0,
      max: (len - 1 < 0) ? 0 : len -1
    };
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
}

module.exports = Collection;