<template>
  <div>
    <menu-site v-bind:auth="auth" />

    <login-app v-if="!auth" />

    <div>
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
      appTag: 'authentication'
    }
  },
  mounted() {
    this.$app.on(this.appTag, this.authenticated, this.listenCallback)
  },
  unmounted() {
    this.removeListener({ listener: this.appTag });
  },
  methods: {
    authenticated(auth) {
      this.auth = auth;
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
</style>
