import Translate from './translate';

class App extends Translate {
  constructor() { super(); }

  async build() {
    this.getLanguages();
    this.setLanguage(this.get('language') || this.navigatorLanguage());
    await this.sync();
    await this.authentication();
    this.emit('app-loading-end');
  }
}

export default function (Vue) {
  let app = new App(Vue);

  app.build();

  Vue.config.globalProperties.$app = app;
}