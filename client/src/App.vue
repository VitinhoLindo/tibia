<template>
  <div>
    <menu-site v-bind:auth="auth" />

    <app-loading />
    <perfil-app v-if="auth" />
    <login-app v-if="!auth" />

    <div class="content-app">
      <router-view />
    </div>
  </div>
  <!--
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  -->
</template>

<script>
import BaseMixin from './mixins/basemixin'

export default {
  name: 'App',
  mixins: [BaseMixin],
  data() {
    return {
      auth: false,
      appTag: 'authentication',
      loadTag: 'app-loading-end'
    }
  },
  mounted() {
    this.$app.on(this.appTag, this.authenticated, this.listenCallback)
    this.$app.on(this.loadTag, this.appLoaded, this.appLoadCallback);
  },
  unmounted() {
    this.removeListener({ listener: this.appTag });
    this.removeListener({ listener: this.loadTag });
  },
  methods: {
    authenticated(auth) {
      this.auth = auth;
    },
    appLoaded() {
      this.$app.emit('loading', { on: false, message: '' });
    },
    appLoadCallback(err, pid) {
      if (err) return console.error(err);
      this.addListener({ listener: this.loadTag, pid: pid });
    },
    listenCallback(err, pid) {
      if (err) return console.error(err);
      this.addListener({ listener: this.appTag, pid: pid });
    }
  }
}
</script>

<style lang="scss">
html,
body, 
#app {
  width: 100%;
  height: 100%;
  padding: 0%;
  margin: 0%;
  background-color: #000b1f;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  z-index: 1;
  position: absolute;
  color: #ffffff;
}

.content-app {
  position: absolute;
  top: 35px;
  left: 0;
  width: 100%;
  height: calc(100% - 35px);
  text-align: center;
}

.btn-frist {
  cursor: pointer;
  color: #ffffff;
  background-color: rgba($color: #3498db, $alpha: 1.0);
}

.btn-frist:hover {
  background-color: rgba($color: #3498db, $alpha: 0.6);
}

.btn-frist:focus {
  outline: 0;
}

.btn-danger {
  cursor: pointer;
  color: #ffffff;
  background-color: rgba($color: #e74c3c, $alpha: 1.0);
}

.btn-danger:hover {
  background-color: rgba($color: #e74c3c, $alpha: 0.6);
}

.btn-danger:focus {
  outline: 0;
}

.btn {
  min-width: 100px;
  min-height: 40px;
  margin: 0px 5px;
  border: none;
  -webkit-border-radius: 5px;
}

.fields .field {
  margin: 2.5px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fields .field .content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.fields .field .content label {
  color: #000000;
  min-width: 25%;
  font-size: 18px;
  text-align: center;
}

.fields .field .content input[type=text] {
  padding: 5px;
  width: 60%;
  font-size: 18px;
  border: none;
  -webkit-border-radius: 5px;
  box-shadow: 0px 0px 2px 0px #95a5a6;
}

.fields .field .content input[type=email] {
  padding: 5px;
  width: 60%;
  font-size: 18px;
  border: none;
  -webkit-border-radius: 5px;
  box-shadow: 0px 0px 2px 0px #95a5a6;
}

.fields .field .content input[type=password] {
  padding: 5px;
  width: 60%;
  font-size: 18px;
  border: none;
  -webkit-border-radius: 5px;
  box-shadow: 0px 0px 2px 0px #95a5a6;
}

.fields .field .content input[type=file] {
  padding: 5px;
  width: 60%;
  font-size: 18px;
  border: none;
}

.fields .field .content .file {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fields .field .content .file img {
  max-width: 70px;
  max-height: 70px;
  margin: 5px;
  -webkit-border-radius: 50%;
}

.fields .field .content input[type=text]:focus {
  outline: 0;
  box-shadow: 0px 0px 4px 0px #3498db;
}

.fields .field .content input[type=password]:focus {
  outline: 0;
  box-shadow: 0px 0px 4px 0px #3498db;
}

.fields .field .content input[type=email]:focus {
  outline: 0;
  box-shadow: 0px 0px 4px 0px #3498db;
}

.fields .field .complement .info {
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 2.5px;
  color: #cccccc;
}
.fields .field .complement .error {
  width: 100%;
  text-align: center;
  font-size: 12px;
  padding: 2.5px;
  color: #e74c3c;
}

@media only screen and (max-width: 768px) {
  .fields .field .content input[type=file] {
    padding: 10px;
    width: 60%;
    font-size: 18px;
    border: none;
  }
}
</style>
