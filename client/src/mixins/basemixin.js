export default {
  data () {
    return {
      listeners: []
    }
  },
  methods: {
    addListener(arg = { listener: '', pid: 0 }) {
      this.listeners.push(arg);
    },
    removeListener(arg = { listener: '' }) {
      let listenFilter = this.listeners.filter((model) => {
        if (model.listener == arg.listiner)
          return model;
      });
  
      for(let listen of listenFilter) {
        try {
          this.$app.off(listen.listener, listen.pid);
        } catch (error) {
          console.error(error);
        }
      }
    },
    loading(bool = false, message = '') {
      this.$app.emit('loading', { on: bool, message: '' });
    }
  }
}