<template>
  <div class="perfil" v-if="on">
    <div class="perfil-content">
      <!-- label login -->
      <div class="label">{{ labels['PERFIL-APP-LABEL'] }}</div>
      
      <!-- complement login email [info, error] -->
      <form class="fields" @submit="(event) => savePerfil(event)">
        <!-- <div class="field">
          <div class="content">
            <label> {{ labels['CPF-LABEL'] }} </label>
            <input  type="text" v-model="values.cpf.value" @input="cpfChange" v-bind:placeholder="labels['CPF-LABEL']" >
          </div>

          <div class="complement">
            <div class="info" v-if="values.cpf.info">{{ values.cpf.info }}</div>
            <div class="error" v-if="values.cpf.error">{{ values.cpf.error }}</div>
          </div>
        </div> -->

        <file-input v-bind:data="values.profile" v-bind:label="'IMAGE-LABEL'" v-bind:form="perfilTag" v-on:onInputFile="fileChange" />

        <div class="buttons">
          <button v-for="(btn, index) in buttons" v-bind:class="btn.class" v-bind:value="btn.value + '-' + index" v-bind:key="index">
            {{ labels[btn.label] }}
          </button>
        </div>
      </form>

    </div>

  </div>
</template>

<script>
import BaseMixin from '../mixins/basemixin'
import LangMixin from '../mixins/langmixin'

export default {
  name: 'Perfil',
  mixins: [BaseMixin, LangMixin],
  props: ['user'],
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
        profile: {
          value: null,
          type: 'image',
          info: '',
          error: ''
        }
      },
      buttons: [
        { class: 'btn btn-danger', value: 'cancel', label: 'CANCEL-LABEL', on: this.perfilListen },
        { class: 'btn btn-frist', value: 'submit', label: 'SAVE-LABEL' }
      ]
    }
  },
  methods: {
    fileChange(event, data) {
      this.values.profile = data;
    },
    async savePerfil(event = new SubmitEvent) {
      event.preventDefault();

      let [name, index] = event.submitter.value.split('-');

      switch (name) {
        case 'cancel':
          if (this.buttons[parseInt(index)].on) this.buttons[parseInt(index)].on();
          return;
      }
      // v-on:click="perfilListen()"
      console.log(event);
      // this.loading(true);
      // let data = {};
      
      // for(let key in this.values) 
      //   data[key] = this.values[key].value;

      // try {
      //   let { code, message, result, status } = await this.$app.request({
      //     url: '/user',
      //     method: 'post',
      //     data: data
      //   })

      //   if (status == 'error') throw message;

      //   this.$emit('user-changed', { event: event, data: result });
      // } catch (error) {
      //   console.error(error);
      // }

      // this.loading(false);
    },
    async getData() {
      for(let key in this.user)
        this.values[key].value = this.user[key];
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