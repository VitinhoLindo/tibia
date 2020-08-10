<template>
  <div id="app">
    <router-view v-bind:shared="shared" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    shared: {
      //  path: 'http://10.0.0.108:3000'
    }
  }),
}
</script>

<style>
html, body, #app {
  margin: 0px;
  padding: 0px;
  background-color: #353b48;
}
</style>