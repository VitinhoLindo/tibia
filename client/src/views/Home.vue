<template>
  <div class="home">
    <component v-if="form" v-bind:is="form"></component>
  </div>
</template>

<script>
import BaseMixin from '../mixins/basemixin'
import LangMixin from '../mixins/langmixin'

export default {
  name: 'Home',
  mixins: [BaseMixin, LangMixin],
  data () {
    return {
      tagName: 'form',
      form: ''
    }
  },
  mounted () {
    this.$app.on(this.tagName, this.onForm, this.listenCallback);
  },
  unmounted() {
    this.removeListener({ listener: this.tagName });
  },
  methods: {
    onForm(event) {
      this.form = event.data.resource;
    },
    listenCallback(err, pid) {
      if (err) return console.error(err);
      this.addListener({ listener: this.tagName, pid: pid });
    }
  }
}
</script>

