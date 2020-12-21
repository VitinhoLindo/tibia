import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import MyApp from './app'
import Component from './component.js'

(async () => {
  const app = createApp(App);

  app.use(store);
  app.use(router);

  MyApp(app);
  Component(app);

  app.mount('#app');
})();
