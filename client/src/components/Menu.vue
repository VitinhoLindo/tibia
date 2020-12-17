<template>
  <div class="menu">
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
        v-on:click="openForm(panel.resource)"
      >{{ labels[panel.singular] }}</button>

      <button 
        v-if="!auth" 
        class="btn" 
        v-on:click="openForm('system-login')"
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
  props: {
    auth: {
      type: Boolean,
      required: true,
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
      menuTag: 'authentication'
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
    openForm(resource) {
      this.show = false;
      this.$app.emit(resource);
    },
    callbackListen(err, pid) {
      if (err) return console.error(err);
      this.addListener({ listiner: this.menuTag, pid: pid });
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

@media only screen and (max-width: 768px) {
  .menu {
    height: 35px;
  }

  .menu .options {
    top: 35px;
  }
} 
</style>
