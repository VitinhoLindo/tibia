<template>
  <div class="menu">

    <div v-if="auth && src" class="perfil-user">
      <img v-bind:src="src">
    </div>
    <svg-button v-on:click="menushow" />

    <div v-if="show" class="options" v-on:mouseleave="menushow">
      <custom-select 
        v-bind:label="labels[lang]"
        v-bind:values="values"
        v-on:selected="changeLang"
      />

      <button 
        class="btn" 
        v-for="(panel, index) in panels"
        v-bind:key="index"
        v-on:click="(event) => openForm(event, panel.resource)"
      >{{ labels[panel.singular] }}</button>

      <button 
        v-if="!auth" 
        class="btn" 
        v-on:click="(event) => openForm(event, {
          resource: 'system-login',
          singular: 'LOGIN-APP-LABEL',
          plural: 'LOGIN-APP-LABEL'
        })"
      >{{ labels['LOGIN-APP-LABEL'] }}</button>

    </div>
  </div>
</template>

<script>
import SvgButton from './SvgButton.vue'
import BaseMixin from '../mixins/basemixin'
import LangMixin from '../mixins/langmixin';

export default {
  name: 'Menu',
  mixins: [BaseMixin, LangMixin],
  watch: {
    auth: function (_n, _l) {
      if (!_n) return;
      this.setSrc();
    }
  },
  props: {
    auth: {
      type: Boolean,
      required: true,
      default: false
    },
    user: {
      type: Object,
      required: false,
      default: null
    }
  },
  components: {
    SvgButton
  },
  mounted() {
    this.getPanels();
    this.$app.on(this.menuTag, this.getPanels, this.callbackListen);
  },
  unmounted() {
    this.removeListener({ listiner: this.menuTag });
  },
  data () {
    return {
      options: null,
      show: false,
      panels: [],
      menuTag: 'authentication',
      src: ''
    }
  },
  methods: {
    async getPanels() {
      let { message, code, result, status } = await this.$app.request({
        url: '/resource',
        method: 'get'
      });

      this.panels = result;
    },
    menushow(event) {
      this.show = !this.show;
    },
    callbackListen(err, pid) {
      if (err) return console.error(err);
      this.addListener({ listiner: this.menuTag, pid: pid });
    },
    async setSrc() {
      if (!this.user) return;
      if (!this.user.profile) return;

      let buffer = this.$app.hexToBinary(this.user.profile.binary);
      let base64 = this.app.binaryToBase64(new Uint8Array(buffer));
      this.src = `data:${result.profile.mimeType};base64,${base64}`;
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  background-color: #34495e;
  width: 100%;
  height: 35px;
  z-index: 4;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

.menu .perfil-user {
  position: absolute;
  top: 0px;
  left: 5px;
  height: 30px;
  width: 30px;
  padding: 2.5px;
}

.menu .perfil-user img {
  box-shadow: 0px 0px 1px 0px #ffffff;
  -webkit-border-radius: 50%;
  width: 30px;
  height: 30px;
}

.menu .btn-svg {
  -webkit-border-radius: 5px;
  background-color: rgba($color: #34495e, $alpha: 1.0);
  width: 20px;
  height: 20px;
}

.menu .btn-svg:hover {
  opacity: 0.6;
  background-color: rgba($color: #7f8c8d, $alpha: 0.6);
}

.menu .options {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.menu .options {
  min-width: 220px;
  position: absolute;
  background-color: rgba($color: #34495e, $alpha: 1.0);
  top: 35px;
  right: 0px;
  border: 1px solid #000000;
  padding: 5px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.menu .options select {
  width: 100%;
  min-height: 30px;
}

.menu .options .btn {
  margin: 2.5px 0px;
  cursor: pointer;
  background-color: rgba($color: #34495e, $alpha: 1.0);
  border: none;
  color: #ffffff;
  font-size: 15px;
  width: 100%;
  min-height: 30px;
  line-height: 100%;
  text-align: center;
}

.menu .options .btn:hover {
  background-color: rgba($color: #7f8c8d, $alpha: 0.6);
}

.menu .options .btn:focus {
  outline: 0;
}
</style>
