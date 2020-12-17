export default {
  data () {
    return {
      eventTag: 'lang',
      lang: '',
      labels: {},
      langs: []
    }
  },
  mounted () {
    this.setLangs();
    this.setLang();
    this.$app.on(this.eventTag, this.langChanged, this.langCallback);
  },
  unmounted() {
    this.removeListener({ listiner: this.eventTag });
  },
  methods: {
    setLangs() {
      this.langs = this.$app.getLangs();
    },
    changeLang(_lang) {
      this.$app.setLanguage(_lang);
    },
    setLang(_lang) {
      let lang = this.$app.getLang();

      this.lang   = lang.language;
      this.labels = lang.labels;
    },
    langChanged(...args) {
      this.setLang();
    },
    langCallback(err, pid) {
      if (err) return console.error(err);
      this.addListener({ listener: this.eventTag, pid: pid });
    }
  },
  computed: {
    values() {
      let values = {};
      for(let lang of this.langs) values[lang] = this.labels[lang];
      return values;
    }
  }
}