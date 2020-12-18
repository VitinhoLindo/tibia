<template>
  <div class="home">
    <!-- <h1>{{ labels['ABOUT-H1-LABEL'] }}</h1>

    <h4>{{ labels['ABOUT-SUPORT-LABEL'] }}</h4>

    <ul>
      <li>Benkz</li>
    </ul> -->
  </div>
</template>

<script>
import BaseMixin from '../mixins/basemixin'
import LangMixin from '../mixins/langmixin'

export default {
  name: 'Home',
  mixins: [BaseMixin, LangMixin]
}
</script>

