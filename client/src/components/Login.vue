<template>
  <div v-if="on" class="login">

    <!-- content login -->
    <div class="content-login" v-if="controller.login && !controller.code">
      <!-- label login -->
      <div class="label">{{ labels['LOGIN-APP-LABEL'] }}</div>

      <div class="fields">

        <!-- content login email -->
        <div class="field">
          <div class="content">
            <label> {{ labels['LOGIN-EMAIL-LABEL'] }} </label>
            <input  type="email" v-model="values.login.value" v-bind:placeholder="labels['LOGIN-EMAIL-LABEL']" >
          </div>

          <!-- complement login email [info, error] -->
          <div class="complement">
            <div class="info" v-if="values.login.info">{{ values.login.info }}</div>
            <div class="error" v-if="values.login.error">{{ values.login.error }}</div>
          </div>
        </div>

        <!-- content login senha -->
        <div class="field">
          <div class="content">
            <label>{{ labels['LOGIN-PASS-LABEL'] }}</label>
            <input type="password" v-model="values.senha.value" v-bind:placeholder="labels['LOGIN-PASS-LABEL']">
          </div>

          <!-- complement login senha [info, error] -->
          <div class="complement">
            <div class="info" v-if="values.senha.info">{{ values.senha.info }}</div>
            <div class="error" v-if="values.senha.error">{{ values.senha.error }}</div>
          </div>
        </div>

        <!-- content login forgotem -->
        <div class="field">
          <div class="content">
            <a href="#" v-on:click="listenEvent('login-forgotem')">{{ labels['LOGIN-FORGOTEM-LABEL'] }}</a>
          </div>
        </div>

      </div>

      <!-- listen login -->
      <div class="buttons">
        <button  class="btn-danger" v-on:click="listenEvent('login-cancel')" v-bind:disabled="button.locked">
          {{ labels['CANCEL-LABEL'] }}
        </button>
        <button class="btn-frist" v-on:click="listenEvent('login-sing')" v-bind:disabled="button.locked">
          {{ labels['SING-LABEL'] }}
        </button>
      </div>
    </div>

    <!-- content forgotem -->
    <div class="content-login" v-if="controller.forgotem">
      <!-- label forgotem -->
      <div class="label">{{ labels['FORGOTEM-APP-LABEL'] }}</div>

      <div class="fields">
        <!-- content forgotem email -->
        <div class="field">
          <div class="content">
            <label>{{ labels['LOGIN-EMAIL-LABEL'] }}</label>
            <input type="email" v-model="values.login.value" v-bind:placeholder="labels['LOGIN-EMAIL-LABEL']">
          </div>

          <!-- complement forgotem email [info, error] -->
          <div class="complement">
            <div class="info" v-if="values.login.info">{{ values.login.info }}</div>
            <div class="error" v-if="values.login.error">{{ values.login.error }}</div>
          </div>
        </div>

        <!-- content code -->
        <div class="field" v-if="controller.code">
          <div class="content">
            <label>{{ labels['LOGIN-CODE-LABEL'] }}</label>
            <input type="text" v-model="values.code.value" v-bind:placeholder="labels['LOGIN-CODE-LABEL']">
          </div>

          <!-- complement forgotem email [info, error] -->
          <div class="complement">
            <div class="info" v-if="values.code.info">{{ values.code.info }}</div>
            <div class="error" v-if="values.code.error">{{ values.code.error }}</div>
          </div>
        </div>

        <!-- content senha -->
        <div class="field" v-if="controller.senha">
          <div class="content">
            <label>{{ labels['LOGIN-PASS-LABEL'] }}</label>
            <input type="password" v-model="values.senha.value" v-bind:placeholder="labels['LOGIN-PASS-LABEL']">
          </div>

          <!-- complement forgotem senha [info, error] -->
          <div class="complement">
            <div class="info" v-if="values.senha.info">{{ values.senha.info }}</div>
            <div class="error" v-if="values.senha.error">{{ values.senha.error }}</div>
          </div>
        </div>

        <!-- content senha confirm -->
        <div class="field" v-if="controller.senha">
          <div class="content">
            <label>{{ labels['FORGOTEM-PASS-LABEL'] }}</label>
            <input type="password" v-model="values.senha.confirm" v-bind:placeholder="labels['FORGOTEM-PASS-LABEL']">
          </div>
        </div>
      </div>

      <!-- listen forgotem -->
      <div class="buttons">
        <button class="btn-danger" v-on:click="listenEvent('forgotem-back')" v-bind:disabled="button.locked">
          {{ labels['BACK-LABEL'] }}
        </button>
        <button class="btn-frist" v-on:click="listenEvent('forgotem-submit')" v-bind:disabled="button.locked">
          {{ labels['SUBMIT-LABEL'] }}
        </button>
      </div>
    </div>

    <div class="content-login" v-if="controller.login && controller.code">
      <!-- label login -->
      <div class="label">{{ labels['LOGIN-APP-LABEL'] }}</div>

      <div class="fields">

        <!-- complement forgotem code [info, error] -->
        <div class="field" v-if="controller.code">
          <div class="content">
            <label>{{ labels['LOGIN-CODE-LABEL'] }}</label>
            <input type="text" v-model="values.code.value" v-bind:placeholder="labels['LOGIN-CODE-LABEL']">
          </div>

          <!-- complement forgotem code [info, error] -->
          <div class="complement">
            <div class="info" v-if="values.code.info">{{ values.code.info }}</div>
            <div class="error" v-if="values.code.error">{{ values.code.error }}</div>
          </div>
        </div>
      </div>

      <!-- listen login -->
      <div class="buttons">
        <button class="btn-danger" v-if="controller.codebtn" v-on:click="listenEvent('login-cancel')" v-bind:disabled="button.locked">
          {{ labels['CANCEL-LABEL'] }}
        </button>
        <button class="btn-frist" v-on:click="listenEvent('login-sing')" v-bind:disabled="button.locked">
          {{ labels['SING-LABEL'] }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseMixin from '../mixins/basemixin'
import LangMixin from '../mixins/langmixin';

export default {
  name: 'Login',
  mixins: [BaseMixin, LangMixin],
  mounted () {
    this.$app.on(this.loginTag, this.show, this.langCallback);
  },
  unmounted() {
    this.removeListener({ listiner: this.loginTag });
  },
  data () {
    return {
      on: false,
      button: {
        locked: false
      },
      loginTag: 'system-login',
      controller: {
        login: true,
        forgotem: false,
        code: false,
        senha: false,
        codebtn: false
      },
      values: {
        login: {
          value: '',
          error: '',
          info : ''
        },
        senha: {
          value: '',
          error: '',
          info : '',
          confirm: ''
        },
        code: {
          value: '',
          info : '',
          error: ''
        }
      },
    }
  },
  methods: {
    callForgotem(data) {
      return this.$app.request({
        url:'/forgotem',
        method: 'post',
        data: data,
        encrypt: true
      });
    },
    async sendToForgotem() {
      this.loading(true);
      this.buttonListen(true);

      let data = {
        login: this.values.login.value
      }

      if (this.controller.code) { 
        data.code = this.values.code.value;
      }
      if (this.controller.senha) {
        data.p = await this.$app.hash(this.values.senha.value);
        data.c = await this.$app.hash(this.values.senha.confirm);
      }

      try {
        this.clearError();
        let { status, code, message, result } = await this.callForgotem(data);

        this.loading(false);
        this.buttonListen(false);
        if (status == 'error') {
          if (result.error) {
            for(let field in result.error) {
              if (this.values[field])
                this.values[field].error = result.error[field];
            }
            return;
          }
          else throw message;
        }

      } catch (error) {
        return;
      }

      if (!this.controller.code) { 
        this.codeListen(true);
      } else if (!this.controller.senha) {
        this.passListen(true);
      } else if (this.controller.code && this.controller.senha) {
        this.codeListen(false);
        this.passListen(false);
        this.forgotemListen(false);
        this.values.senha.value   = '';
        this.values.senha.confirm = '';
        this.values.code.value    = '';
        this.loginListen(true);
      }
    },
    async singIn() {
      this.loading(true);
      this.buttonListen(true);
      this.clearError();

      let data = {
        senha: await this.$app.hash(this.values.senha.value),
      }

      if (!this.controller.code) {
        data['login'] = this.values.login.value;
      } else {
        data['login'] = await this.$app.hash(this.values.login.value);
        data['code']  = this.values.code.value;
      }

      try {
        let { code, result, message, status } = await this.$app.request({
          url: '/login',
          method: 'post',
          data,
          encrypt: true
        });

        this.loading(false);
        this.buttonListen(false)
        if (status == 'error') {
          if (result.error) {
            for(let field in result.error) {
              if (this.values[field])
                this.values[field].error = result.error[field];              
            }
            return;
          } else throw message;
        }

        if (!this.controller.code) this.codeListen(true);
        else {
          this.$app.authentication(result.auth);
          this.clearData();
        }
      } catch (error) {
        console.error(error);
      }
    },
    listenEvent(event) {
      switch (event) {
        case 'login-cancel': return this.show();
        case 'login-sing': return this.singIn();
        case 'login-forgotem':
          this.clearData();
          this.loginListen(false);
          return this.forgotemListen(true);
        case 'forgotem-back':
          this.forgotemListen(false);
          return this.loginListen(true);
        case 'forgotem-submit': return this.sendToForgotem();
        default:
          return;
      }
    },
    show() {
      this.on = !this.on;
    },
    loginCallback(err, pid) {
      if (err) return console.error(err);
      this.addListener({ listener: this.login.listener, pid: pid });
    },
    loginListen(bool = false) {
      this.controller.login = bool;
    },
    forgotemListen(bool = false) {
      this.controller.forgotem = bool;
    },
    codeListen(bool = false) {
      this.controller.code = bool;
    },
    passListen(bool = false) {
      this.controller.senha = bool;
    },
    buttonListen(bool = false) {
      this.button.locked = bool;
    },
    codebtnListen(bool = false) {
      this.controller.codebtn = bool;
    },
    clearData() {
      this.values.login.value = ''
      this.values.senha.value = ''
      this.values.senha.confirm = ''
      this.values.code.value = ''
    },
    clearError() {
      for(let field in this.values) {
        this.values[field].error = '';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 4;
}

.login .content-login {
  -webkit-border-radius: 5px;
  width: 350px;
  min-height: 100px;
  background-color: #ffffff;
  padding: 0px;
}

.login .content-login .label {
  width: 100%;
  color: rgba($color: #000000, $alpha: 0.5);
  text-align: center;
  padding: 5px;
}
.login .content-login .fields {
  width: 100%;
  color: #000000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login .content-login .fields .field {
  margin: 2.5px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login .content-login .fields .field .content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login .content-login .fields .field .content label {
  min-width: 25%;
  font-size: 18px;
  text-align: center;
}

.login .content-login .fields .field .content input {
  padding: 5px;
  width: 60%;
  font-size: 18px;
  border: none;
  -webkit-border-radius: 5px;
  box-shadow: 0px 0px 2px 0px #95a5a6;
}

.login .content-login .fields .field .content input:focus {
  outline: 0;
  box-shadow: 0px 0px 4px 0px #3498db;
}

.login .content-login .fields .field .complement .info {
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 2.5px;
  color: #cccccc;
}
.login .content-login .fields .field .complement .error {
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 2.5px;
  color: #e74c3c;
}

.login .content-login .buttons {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login .content-login .buttons button {
  width: 100px;
  height: 40px;
  margin: 0px 5px;
  border: none;
  -webkit-border-radius: 5px;
}
</style>