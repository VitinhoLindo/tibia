<template>
  <div class="add" v-on:click="bodyClick">
    <div class="content">
      <div v-on:click="addSection">Section</div>
      <div v-on:click="addNpc">Npc</div>
      <div v-on:click="showMonit">Monit</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Add',
  props: {
    add: {
      type: Function,
      required: true
    },
    addSection: {
      type: Function,
      required: true
    },
    addNpc: {
      type: Function,
      required: true
    },
    showMonit: {
      type: Function,
      required: true
    }
  },
  methods: {
    bodyClick(event = MouseEvent) {
      if (event.srcElement.className == 'add') {
        this.add();
      }
    }
  }
}
</script>

<style>
.add {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(113, 128, 147, 0.4);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 5;
  overflow: hidden;
  cursor: pointer;
}

.add .content {
  width: 200px;
  height: 115px;
  border: 1px solid #888888;
  background-color: #353b48;
  color: #ffffff;
  position: fixed;
  padding: 20px;
  overflow: auto;
  cursor:default;
}

.add .content div {
  width: 100%;
  height: 25px;
  font-size: 20px;
  text-align: center;
  background-color: #718093;
  margin-bottom: 2px;
  padding: 5px 0px;
  cursor: pointer;
}
.add .content div:hover {
  opacity: 0.6;
}
</style>