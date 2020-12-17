import Translate from './translate';

class App extends Translate {
  constructor() { super(); }

  async build() {
    await this.getLanguages();
    await this.setLanguage(this.get('language') || this.navigatorLanguage());
    await this.sync();
    await this.authentication();
  }
}

export default async function (Vue) {
  let app = new App(Vue);

  await app.build();

  Vue.config.globalProperties.$app = app;
}