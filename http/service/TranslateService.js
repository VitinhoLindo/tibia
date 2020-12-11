const Base = require('./Base');

class TranslateService extends Base {
  constructor(request, response) { super(request, response); }

  async returnServerLangs() {
    let path = this.app.path.publicLangDir();
    let files = this.app.readDir(path, { encoding: 'utf8' });
    if (files.exists) files.content = files.content.map(function (file) { return file.replace(/\.json/, ''); });
    return this.defaultResponseJSON({ result: { langs: files.content } });
  }

  getFileLang(lang = '') {
    let path = this.app.path.publicLangDir(`${lang}.json`);
    return this.app.readFile(path, { encoding: 'utf8' });
  }

  async sendDefaultLang() {
    let file = this.getFileLang(this.app.serverLang);

    return this.defaultResponseJSON({ result: {
      lang: this.app.serverLang,
      labels: JSON.parse(file.content)
    }})
  }
}

module.exports = TranslateService;