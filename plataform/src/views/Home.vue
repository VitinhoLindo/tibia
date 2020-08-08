<template>
  <div class="home">
    <section-line 
      v-for="(section, index) in sections" 
      v-bind:key="index" 
      v-bind:section="section" 
      v-bind:openSection="openSection"
    />

    <section-modal 
      v-if="section.on"
      v-bind:data="section.data"
      v-bind:closeSection="closeSection"
    />

    <app-loading 
      v-if="loading"
    />
  </div>
</template>

<script>
import Axios from 'axios';
import SectionLine from '../components/SectionLine';
import SectionModal from '../components/SectionModal';
import Loading from '../components/Loading';

export default {
  name: 'Home',
  mounted() {
    this.getSections();
  },
  props: {
    shared: {
      type: Object,
      required: true
    }
  },
  components: {
    SectionLine,
    SectionModal,
    AppLoading: Loading
  },
  data: () => ({
    sections: [],
    section: {
      on: false,
      data: null
    },
    loading: false
  }),
  methods: {
    async getSections() {
      this.loading = true;
      try {
        let { data } = await Axios({
          url: `${this.shared.path}/section`,
          method: 'GET'
        });

        this.sections = data;
      } catch (error) { }
      this.loading = false;
    },
    setSectionData(value) {
      this.section.data = value;
    },
    setSectionOn(value) {
      this.section.on = value;
    },
    openSection(section) {
      this.setSectionData(section);
      this.setSectionOn(true);
    },
    closeSection() {
      this.setSectionOn(false);
      this.setSectionData(null);
    }
  }
}
</script>

<style>

@media screen and (max-width: 500px){
  .home {
    width: 100%;
    height: 100%;
    margin: auto;
  }
}
@media screen and (min-width: 501px){
  .home {
    width: 100%;
    height: 100%;
    margin: auto;
  }
}
</style>