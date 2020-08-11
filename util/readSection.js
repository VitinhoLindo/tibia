const NpcSection = require('./npcSection');

class ReadSection extends NpcSection {
  constructor() { super(); }

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

  getKilledMonsters(section = [], len = 0) {
    let finalRegExp = /\:/g;
    let monsters    = [];

    while(true) {
      let value = section[len];

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

  getLootedMonsters(section = [],len = 0) {
    let finalRegExp = /\:/g;
    let looteds     = [];

    while(true) {
      let value = section[len];

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

  setKilledAndMonsters(section = []) {
    let killedObject = this.getKilledMonsters(section, 12);
    let LootedObject = this.getLootedMonsters(section, killedObject.length + 1);

    return {
      killed: killedObject.killed,
      looted: LootedObject.looted
    };
  }

  getNewData() {
    return {
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

  async setNewSection(section = '') {
    let controller = {
      len: 0,
      houses: [0,1,2,4,5,6,7,9,12]
    };
    let data = this.getNewData();
    section = section.split(/\n/g).filter((a) => { console.log(a); if (a) return a; });

    while(true) {
      let _line = section[controller.houses[controller.len]];
      if (!_line && (controller.houses.length == controller.len)) break;
      else if (!_line && !(controller.houses.length == controller.len)) throw 'section is not supported';

      if (typeof _line != 'string') throw 'error: type data is not supported';
      controller.len++;
    }

    data.section.date = this.getDataType(section[0], 'date-time');
    data.section.time = this.getDataType(section[1], 'time');
    data.experience   = this.getDataType(section[2], 'decimal');
    data.loot         = this.getDataType(section[4], 'decimal');
    data.supplies     = this.getDataType(section[5], 'decimal');
    data.balance      = this.getDataType(section[6], 'decimal');
    data.damage       = this.getDataType(section[7], 'decimal');
    data.healing      = this.getDataType(section[9], 'decimal');

    let _data         = this.setKilledAndMonsters(section);
    data.killed       = _data.killed;
    data.looted       = _data.looted;

    this.saveDataJSON(data);
  }

  async saveDataJSON(data) {
    let fileName = this.repositorys.section.file.replace(
      /@date@/g, 
      `${data.section.date.toLocaleDateString().replace(/\/|\-/g, '')}${data.section.date.getTime()}`
    );

    await this.fs.writeFileSync(
      `${this.dirname}${this.repositorys.dir}${this.repositorys.section.dir}${this.repositorys.dir}${fileName}`,
      JSON.stringify(data),
      {
        encoding: 'utf-8'
      }
    );
  }

  async getSectionStorageData() {
    let dirFiles = await this.fs.readdirSync(`${this.dirname}${this.repositorys.dir}${this.repositorys.section.dir}${this.repositorys.dir}`);
    let sections = [], len = 0;

    while(true) {
      let value = dirFiles[len];
      if (!value) break;

      let file = await this.fs.readFileSync(`${this.dirname}${this.repositorys.dir}${this.repositorys.section.dir}${this.repositorys.dir}${value}`, { encoding: 'utf-8' });
      sections.push(JSON.parse(file));
      len++;
    }

    while(true) {
      var normalized = true, index = 0;

      while(true) {
        let section  = sections[index];
        let _section = sections[index + 1]; 

        if (_section == undefined) break;
        if (new Date(section.section.date) < new Date(_section.section.date)) {
          let _section_ = Object.assign({}, section);
          sections[index]     = _section;
          sections[index + 1] = _section_;
          normalized = false;
          break;
        }

        index++;
      }

      if (normalized) break;
    }

    return sections;
  }

  getSellIten(buy = [], looted = []) {
    var itens = [];

    var buyLen = 0, buyItens;
    while(true) {
      buyItens = buy[buyLen];

      if (buyItens == undefined) break;
      var lootedLen = 0, lootedIten;
      while(true) {
        lootedIten = looted[lootedLen];

        if (lootedIten == undefined) break;
        if (buyItens.name.toLowerCase().replace(' ', '') == lootedIten.looted.toLowerCase().replace(' ', ''))
          itens.push({ name: buyItens.name, price: buyItens.price, total: lootedIten.total });

        lootedLen++;
      }

      buyLen++;
    }


    return {
      itens: itens
    }
  }

  async getLocaleSellItem(sections = [], npcs = []) {

    var npcsLen = 0, npc;
    while(true) {
      npc = npcs[npcsLen];

      if (npc == undefined) break;
      var sectionLen = 0, section;
      while(true) {
        section = sections[sectionLen];

        if (section == undefined) break;
        let result = this.getSellIten(npc.buy, section.looted);

        if (result.itens.length) {
          if (section.npcs == undefined) section.npcs = [];
          let _npc = Object.assign({}, npc);
          _npc.buy = result.itens;
          section.npcs.push(_npc);
        }

        sections[sectionLen] = section;
        sectionLen++;
      }

      npcsLen++;
    }

    return sections;
  }

  async getSectionData() {
    let sections = await this.getSectionStorageData();
    let npcs     = await this.getNpcs();

    return await this.getLocaleSellItem(sections, npcs);
  }
}

module.exports = ReadSection;