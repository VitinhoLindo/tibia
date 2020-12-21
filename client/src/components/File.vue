<template>
  <div class="field">
    <div class="content">
      <label> {{ labels[label] }} </label>
      <div class="file">
        <img v-if="data.type == 'image' && src" v-bind:src="src">
        <input type="file" @change="onChange">
      </div>
    </div>

    <div class="complement">
      <div class="info" v-if="data.info">{{ data.info }}</div>
      <div class="error" v-if="data.error">{{ data.error }}</div>
    </div>
  </div>
</template>

<script>
import BaseMixin from '../mixins/basemixin'
import LangMixin from '../mixins/langmixin'

export default {
  name: "File",
  mixins: [BaseMixin, LangMixin],
  props: ['data', 'form'],
  data() {
    return {
      src: '',
      filesize: 12
    }
  },
  mounted () {
    if (!this.data.value.binary) return;

    let buffer = this.$app.hexToBinary(this.data.value.binary);
    this.readSrc(new Blob([new Uint8Array(buffer)], { type: this.data.value.mimeType, name: this.data.value.name }));
  },
  methods: {
    type(mimetype = '') {
      let [type, extension] = mimetype.split('/');
      return {type, extension};
    },
    validateType(mimetype = '') {
      let mime = this.type(mimetype);

      return this.data.type == mime.type
    },
    readSrc(blob) {
      if (!blob) {
        this.src = null;
        return;
      }

      let fileReader = new FileReader();
      fileReader.onloadend = (res) => {
        let base64 = res.target.result;

        this.src = base64;
      }

      fileReader.readAsDataURL(blob);
    },
    readHex(blob = new Blob) {
      let fileReader = new FileReader();
      fileReader.onloadend = (res) => {
        let buffer = res.target.result;
        let data = Object.assign({}, this.data);

        data.value = {
          binary: this.$app.binaryToHex(buffer),
          formatBinary: 'hex',
          mimeType: blob.type,
          name: blob.name,
          size: blob.size
        };
        this.$emit('onInputFile', event, data);
      }

      fileReader.readAsArrayBuffer(blob);
    },
    onChange(event = new Event) {
      let blob = event.srcElement.files[0];

      if (!blob) {
        let data = Object.assign({}, this.data);
        data.value = null;
        this.$emit('onInputFile', event, data);
        this.readSrc();
        return;
      }

      if (!this.validateType(blob.type)) return;
      this.readSrc(blob);
      this.readHex(blob);
    }
  },
  computed: {
    label() {
      return this.data.type.toUpperCase() + '-LABEL';
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>