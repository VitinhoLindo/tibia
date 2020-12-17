const Mailer = require('./Mailer');

class Translate extends Mailer {
  constructor() { super(); }

  lang(label, _default, __lang) {
    return this.langs[__lang][label] || _default;
  }

  readTranslates() {
    let dir = this.readDir(this.path.publicLangDir());

    if (!dir.exists) console.log(`server don\'t contains languages path`);

    for(let file of dir.content) {
      let [lang, extension] = file.split('.');
      if (!extension) continue;
      
      let _file = this.readFile(this.path.publicLangDir(file), { encoding: 'utf8' });
      if (!_file.exists) continue;

      try {
        this.langs[lang] = JSON.parse(_file.content);
      } catch (error) { }
    }
  }
}

module.exports = Translate;