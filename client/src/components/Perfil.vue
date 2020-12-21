<template>
  <div class="perfil" v-if="on">
    <div class="perfil-content">
      <!-- label login -->
      <div class="label">{{ labels['PERFIL-APP-LABEL'] }}</div>
      
      <!-- complement login email [info, error] -->
      <div class="fields">
        <div class="field">
          <div class="content">
            <label> {{ labels['CPF-LABEL'] }} </label>
            <input  type="text" v-model="values.cpf.value" @input="cpfChange" v-bind:placeholder="labels['CPF-LABEL']" >
          </div>

          <div class="complement">
            <div class="info" v-if="values.cpf.info">{{ values.cpf.info }}</div>
            <div class="error" v-if="values.cpf.error">{{ values.cpf.error }}</div>
          </div>
        </div>

        <file-input v-bind:data="values.profile" v-bind:form="perfilTag" v-on:onInputFile="fileChange" />
      </div>

      <div class="buttons">
        <button class="btn btn-danger" v-on:click="perfilListen()">{{ labels['CANCEL-LABEL'] }}</button>
        <button class="btn btn-frist" v-on:click="(event) => savePerfil(event)">{{ labels['SAVE-LABEL'] }}</button>
      </div>
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
      on: false,
      values: {
        cpf: {
          value: '',
          info: '',
          error: ''
        },
        profile: {
          value: null,
          type: 'image',
          info: '',
          error: ''
        }
      }
    }
  },
  methods: {
    cpfChange(event) {
      if (this.values.cpf.value.length < 11) return;
      let exec = /\.|\-/g.exec(this.values.cpf.value);
      if (exec) return;

      let nextIndex = 0;
      let value = '';
      while(nextIndex < this.values.cpf.value.length) {
        let string = '';

        if (nextIndex + 3 < this.values.cpf.value.length)
          string = this.values.cpf.value.substr(nextIndex, 3);
        else
          string = this.values.cpf.value.substr(nextIndex);
        nextIndex += 3;

        if (nextIndex == 3) {
          value += string;
        } else if (string.length == 2) {
          value += `-${string}`;
        } else {
          value += `.${string}`;
        }
      }

      this.values.cpf.value = value;
    },
    fileChange(event, data) {
      this.values.profile = data;
    },
    async savePerfil(event) {
      this.loading(true);
      let data = {};
      
      for(let key in this.values) 
        if (key == 'cpf') 
          data[key] = await this.$app.encrypt(this.values[key].value);
        else 
          data[key] = this.values[key].value;

      console.log(data);

      try {
        let { code, message, result, status } = await this.$app.request({
          url: '/user',
          method: 'post',
          data: data
        })

        this.loading(false);
        if (status == 'error') throw message;
      } catch (error) {
        console.error(error);
      }
    },
    async getData() {
      this.loading(true);
      let { code, message, result, status } = await this.$app.request({
        url: '/user',
        method: 'get'
      });

      for(let key in result) {
        if (key == 'cpf')
          result[key] = await this.$app.decrypt(result[key]);
        this.values[key].value = result[key];
      }
      this.cpfChange();

      this.loading(false);
    },
    async perfilListen() {
      if (!this.on) await this.getData();
      this.on = !this.on;
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

.perfil .perfil-content {
  min-width: 500px;
  max-width: 100%;
  max-height: 100%;
  background-color: #ffffff;
  -webkit-border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.perfil .perfil-content .label {
  width: 100%;
  color: rgba($color: #000000, $alpha: 0.5);
  text-align: center;
  padding: 5px;
}

.perfil .perfil-content .fields {
  width: 90%;
}

.perfil .perfil-content .buttons {
  height: 50px;
  padding: 10px;
}

@media only screen and (max-width: 768px) {
  .perfil .perfil-content {
    min-width: 250px;
    max-width: 400px;
  }

  .perfil .perfil-content .fields {
    width: 100%;
  }
}
</style>