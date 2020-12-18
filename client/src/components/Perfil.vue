<template>
  <div class="perfil" v-if="on">
    <div class="content">
      <!-- complement login email [info, error] 
      <div class="fields">
        <div class="field">
          <div class="content">
            <label> {{ labels['LOGIN-EMAIL-LABEL'] }} </label>
            <input  type="email" v-model="values.login.value" v-bind:placeholder="labels['LOGIN-EMAIL-LABEL']" >
          </div>

          <div class="complement">
            <div class="info" v-if="values.login.info">{{ values.login.info }}</div>
            <div class="error" v-if="values.login.error">{{ values.login.error }}</div>
          </div>
        </div>
      </div>
      -->
    </div>

    <div class="buttons">
      <button class="btn btn-danger" v-on:click="perfilListen()">{{ labels['CANCEL-LABEL'] }}</button>
      <button class="btn btn-frist">{{ labels['SAVE-LABEL'] }}</button>
    </div>
  </div>
</template>

<script>
import BaseMixin from '../mixins/basemixin'
import LangMixin from '../mixins/langmixin'

export default {
  name: 'Perfil',
  mixins: [BaseMixin, LangMixin],
  mounted() {
    this.$app.on(this.perfilTag, this.perfilListen, this.listenCallback);
  },
  unmounted() {
    this.removeListener({ listener: this.perfilTag });
  },
  data() {
    return {
      perfilTag: 'system-user',
      on: false
    }
  },
  methods: {
    perfilListen() {
      this.on = !this.on;
      console.log(this.on);
    },
    listenCallback(err, pid) {
      if (err) return console.error(err);
      this.addListener({ listener: this.perfilTag, pid: pid });
    }
  }
}
</script>

<style lang="scss" scoped>
.perfil {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 4;
}

.perfil .content {
  min-width: 500px;
  max-height: calc(100% - 50px);
  background-color: #ffffff;
  -webkit-border-radius: 5px;
}

.perfil .buttons {
  height: 50px;
  padding: 10px;
}
</style>