import MenuSite from './components/Menu.vue'
import CustomSelect from './components/CustomSelect.vue'
import Login from './components/Login.vue'
import Perfil from './components/Perfil.vue'
import File from './components/File.vue'
import Loading from './components/Loading.vue'

export default async function (Vue) {
  Vue.component('menu-site', MenuSite);
  Vue.component('custom-select', CustomSelect);
  Vue.component('system-login', Login);
  Vue.component('file-input', File);
  Vue.component('app-loading', Loading);
  // Vue.component('perfil-app', Perfil);
}