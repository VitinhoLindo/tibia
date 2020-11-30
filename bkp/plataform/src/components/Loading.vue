<template>
  <div v-if="open" class="loading">
    <loading-default />
  </div>
</template>

<script>
import Default from './Default';

export default {
  name: 'loading',
  components: {
    LoadingDefault: Default
  },
  data: () => ({
    open: false,
    type: ''
  }),
  mounted() {
    this.open = true;
  }
}
</script>

<style>
.loading {
  top: 0px;
  left: 0px;
  position: fixed;
  background: rgb(0, 0, 0, 0.4);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 999;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>