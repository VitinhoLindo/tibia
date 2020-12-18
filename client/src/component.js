import MenuSite from './components/Menu.vue'
import CustomSelect from './components/CustomSelect.vue'
import Login from './components/Login.vue'
import Perfil from './components/Perfil.vue'

export default async function (Vue) {
  Vue.component('menu-site', MenuSite);
  Vue.component('custom-select', CustomSelect);
  Vue.component('login-app', Login);
  Vue.component('perfil-app', Perfil);
}