import Request from './Request'

class Translate extends Request {
  constructor() { super(); }

  getLangs() {
    return this.languages;
  }

  getLang() {
    return this.lang;
  }

  async getLanguages() {
    let { code, result, message, status } = await this.request({ 
      url: '/translate',
      method: 'get'
    })

    this.languages = result.langs;
  }

  async setLanguage(lang = 'pt-BR') {
    let { code, result, message, status } = await this.request({ 
      url: '/translate',
      method: 'get',
      params: { lang }
    })

    this.lang = {
      language: result.lang,
      labels: result.labels
    }

    this.defaultHeaders['language'] = lang;
    this.emit('lang');
  }
}

export default Translate;