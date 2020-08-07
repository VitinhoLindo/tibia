class ReadSection {
  listenTime      = 5000;
  fs              = require('fs');
  file            = null;
  fileNameAndDir  = 'section.txt';
  fileSaveNameDir = 'database/sections/@date@.json';
  dirFileDir      = 'database/sections';
  data            = null
  processing      = false;
  dirname         = '';
  
  constructor() { }

  async _setFile(value) {
    this.file = value;
  }

  async setFile() {
    this._setFile(await this.fs.readFileSync(`${this.dirname}/${this.fileNameAndDir}`, { encoding: 'utf-8' }));
  }

  getIntergerInString(value = '') {
    let _controller = { finalize: false, len: 0, data: [], value: '' };

    while(true) {
      while(true) {

        if (!value[_controller.len])           { _controller.finalize = true; break; }
        if (/\d/.test(value[_controller.len])) { _controller.value += value[_controller.len]; _controller.len++; }
        else                                   { _controller.len++; break; }
      }

      if (_controller.value)    { _controller.data.push(_controller.value); _controller.value = ''; }
      if (_controller.finalize) { break; }
    }

    return _controller.data;
  }

  getDataType(value, type) {
    let dateRegExp = /[\d]*-[\d]*-[\d]*/g;
    let timeRegExp = /([\d]*:[\d]*:[\d]*)|([\d]*:[\d]*)/g;
    let intRegExp = /[\d]*/g;
    let exec = null;
    let newData = '';

    switch (type) {
      case 'date-time':
        if (!dateRegExp.test(value)) return new Date();
        exec = dateRegExp.exec(value);
        newData += `${exec[0]} `;

        if (!timeRegExp.test(value)) return new Date(`${newData}0:0:0`);
        exec = timeRegExp.exec(value);
        newData += exec[0];

        return new Date(newData);
      case 'time':
        if (!timeRegExp.test(value)) return '0:0:0';
        exec = timeRegExp.exec(value);

        return exec[0];
      case 'decimal':
        if (!intRegExp.test(value)) return 0;

        let data = this.getIntergerInString(value);
        let interger = '';
        data.forEach(_value => { interger += _value.toString('utf8'); });

        return parseInt(interger);
    }
  }

  stringConcat(args = []) {
    let string = '';
    args.forEach((value, index) => {
      if (index == 0)
        string += value;
      else
        string += ` ${value}`;
    });

    return string.replace(/\,/g, ' ');
  }

  getKilledMonsters(len = 0) {
    let finalRegExp = /\:/g;
    let monsters    = [];

    while(true) {
      let value = this.file[len];

      if (!value)                  break;
      if (finalRegExp.test(value)) break;

      value = value.replace(/\s\s/g, '');
      value = value.split(/\s/g);

      let interger = this.getIntergerInString(value[0]);
      let intergerString = '';
      interger.forEach((_value) => { intergerString += _value; });
      interger = parseInt(intergerString);
      value.splice(0, 1);
      let monster  = this.stringConcat(value);

      monsters.push({
        total: interger,
        monster: monster
      });
      len++;
    }

    return {
      killed: monsters,
      length: len
    }
  }

  getLootedMonsters(len = 0) {
    let finalRegExp = /\:/g;
    let looteds     = [];

    while(true) {
      let value = this.file[len];

      if (!value)                  break;
      if (finalRegExp.test(value)) break;
      
      value = value.replace(/\s\s/g, '');
      value = value.split(/\s/g);
      
      let interger = this.getIntergerInString(value[0]);
      let intergerString = '';
      interger.forEach((_value) => { intergerString += _value; });
      interger = parseInt(intergerString);

      var __len = 1;
      value.forEach((_value, index) => { if (_value == 'a' || _value == 'an') __len = 2; });
      value.splice(0, __len);
      let looted  = this.stringConcat(value);

      looteds.push({
        total: interger,
        looted: looted
      });
      len++;
    }

    return {
      looted: looteds,
      length: len
    }
  }

  setKilledAndMonsters() {
    let killedObject = this.getKilledMonsters(12);
    let LootedObject = this.getLootedMonsters(killedObject.length + 1);

    return {
      killed: killedObject.killed,
      looted: LootedObject.looted
    };
  }

  setNewData() {
    this.data = {
      section: {
        date: null,
        time: null,
      },
      experience: 0,
      loot      : 0,
      supplies  : 0,
      balance   : 0,
      damage    : 0,
      healing   : 0,
      killed    : [],
      looted    : []
    };
  }

  setProcessing(value) {
    this.processing = value;
  }

  getProcessing() {
    return this.processing;
  }

  async getData() {
    this.setProcessing(true);
    this._setFile(this.file.split(/\n/g));
    this.setNewData();

    this.data.section.date = this.getDataType(this.file[0], 'date-time');
    this.data.section.time = this.getDataType(this.file[1], 'time');
    this.data.experience   = this.getDataType(this.file[2], 'decimal');
    this.data.loot         = this.getDataType(this.file[4], 'decimal');
    this.data.supplies     = this.getDataType(this.file[5], 'decimal');
    this.data.balance      = this.getDataType(this.file[6], 'decimal');
    this.data.damage       = this.getDataType(this.file[7], 'decimal');
    this.data.healing      = this.getDataType(this.file[9], 'decimal');

    let _data              = this.setKilledAndMonsters();
    this.data.killed       = _data.killed;
    this.data.looted       = _data.looted;
  }

  async saveDataJSON() {
    let regExpSave = /@date@/g;
    let date       = new Date();
    let fileName   = this.fileSaveNameDir.replace(regExpSave, `${this.data.section.date.toLocaleDateString().replace(/\/|\-/g, '_')}_${date.getTime()}`);
    await this.fs.writeFileSync(`${this.dirname}/${fileName}`, JSON.stringify(this.data), { encoding: 'utf-8' });
    await this.fs.writeFileSync(`${this.dirname}/${this.fileNameAndDir}`, '', { encoding: 'utf-8' });
    this.setNewData();
    this.setProcessing(false);
  }

  async listen(___dirname) {
    this.dirname = ___dirname;
    setInterval(async () => {
      if (!this.getProcessing()) {
        await this.setFile();
        if (this.file) {
          await this.getData();
          this.saveDataJSON();
        }
      }
    }, this.listenTime);
  }

  async getSectionData() {
    let dirFiles = await this.fs.readdirSync(`${this.dirname}/${this.dirFileDir}`);

    let sections = [], len = 0;

    while(true) {
      let value = dirFiles[len];
      if (!value) break;

      let file = await this.fs.readFileSync(`${this.dirname}/${this.dirFileDir}/${value}`, { encoding: 'utf-8' });
      sections.push(JSON.parse(file));
      len++;
    }


    return sections;
  }
}

module.exports = ReadSection;