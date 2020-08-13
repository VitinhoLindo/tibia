<template>
  <div class="add-section" v-on:click="bodyClick">
    <div class="content">
      <div class="flex">
        <div>
          Section
        </div>
        <div>
        </div>
        <div class="button" v-on:click="send">
          Add
        </div>
      </div>
      <textarea v-model="section">

      </textarea>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: '',
  props: {
    add: {
      type: Function,
      required: true
    },
    refresh: {
      type: Function,
      required: true
    },
    loading: {
      type: Function,
      required: true
    },
    shared: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      section: '',
      failure: ''
    };
  },
  methods: {
    bodyClick(event = MouseEvent) {
      if (event.srcElement.className == 'add-section') {
        this.add();
      }
    },
    async send() {
      try {
        window.document.body.style.cursor = 'progress';
        let { data } = await Axios({
          url: '/section',
          method: 'POST',
          data: { section: this.section }
        });
        window.document.body.style.cursor = 'default';

        if (data.status == 'error') throw data.message;

        this.loading(true);
        setTimeout(() => {
          this.refresh(true, true);
          this.add();
        }, 1000);
      } catch (error) {
        console.error('failure to send hunting section.');
        alert('failure to send hunting section.', error);
      }
    }
  }
}
</script>

<style>
.add-section {
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

.add-section .content {
  width: 400px;
  height: 300px;
  border: 1px solid #888888;
  background-color: #353b48;
  color: #ffffff;
  position: fixed;
  padding: 20px;
  overflow: auto;
  cursor:default;
  overflow: hidden;
}

.add-section .content .flex {
  display: flex;
  margin: 8px 0px;
}

.add-section .content .flex div {
  width: 155px;
  padding: 4px;
}
.add-section .content .flex .button {
  cursor: pointer;
  background-color: #718093;
  text-align: center;
  -webkit-border-radius: 4px;
}
.add-section .content .flex .button:hover {
  opacity: 0.6;
}
.add-section .content textarea {
  resize: none;
  width: 395px;
  height: 250px;
}
</style>