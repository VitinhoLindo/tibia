const TranslateService = require('../service/TranslateService')

class TranslateController extends TranslateService {
  constructor(request, response) { super(request, response) }

  static using(request, response) {
    return new TranslateController(request, response);
  }

  async option() {
    return this.defaultResponseJSON();
  }

  async get() {
    try {
      let all = this.all();

      let validator = this.Validator.make(all, { lang: 'required|string' });

      if (validator.fails()) {
        if (this.app.inArray('required', validator.rule)) {
          return this.returnServerLangs();
        } else return await this.sendDefaultLang();
      } 
      
      let file = this.getFileLang(all.lang);
      if (!file.exists) return await this.sendDefaultLang();

      return this.defaultResponseJSON({ result: {
          lang: all.lang,
          labels: JSON.parse(file.content)
        } 
      });
    } catch (error) {
      return this.sendError(error);
    }
  }

  async post() {
    return this.defaultResponseJSON();
  }

  async put() {
    return this.defaultResponseJSON();
  }

  async delete() {
    return this.defaultResponseJSON();
  }

}

module.exports = TranslateController;