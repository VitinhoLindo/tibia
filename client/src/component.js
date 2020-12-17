import MenuSite from './components/Menu.vue'
import CustomSelect from './components/CustomSelect.vue'
import Login from './components/Login.vue'

export default async function (Vue) {
  Vue.component('menu-site', MenuSite);
  Vue.component('custom-select', CustomSelect);
  Vue.component('login-app', Login);
}