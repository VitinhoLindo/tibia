<template>
  <div class="section-line" v-on:click="lineClick">
    <div class="section-time">{{ getDate() }}</div>
    <div class="section-info">
      <div>{{ getExperience() }}</div>
      <div>{{ getBalance() }}</div>
      <div>{{ getSupplies() }}</div>
      <div>{{ getLoot() }}</div>
      <div>{{ getHealing() }}</div>
      <div>{{ getHour() }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SectionLine",
  props: {
    section: {
      type: Object,
      required: true
    },
    openSection: {
      type: Function,
      required: true
    }
  },
  methods: {
    getDate() {
      let date = new Date(this.section.section.date);
      return `Date: ${date.toLocaleString()}`;
    },
    getExperience() {
      return `Experiencia: ${this.section.experience}`;
    },
    getLoot() {
      return `Loot: ${this.section.loot}`;
    },
    getSupplies() {
      return `Supplie: ${this.section.supplies}`;
    },
    getBalance() {
      return `Balance: ${this.section.loot - this.section.supplies}`;
    },
    getHealing() {
      return `Healing: ${this.section.healing}`;
    },
    getHour() {
      return `Hour: ${this.section.section.time}`;
    },
    lineClick() {
      this.openSection(this.section);
    }
  }
}
</script>

<style>
  @media screen and (max-width: 500px) {
    .section-line {
      width: 500px;
      height: 105px;
      padding: 5px 20px;
      margin: 2.5px auto 2.5px auto;
      cursor: pointer;
      background-color: #718093;
    }
    .section-info {
      margin-left: 10px;
      font-size: 12px;
      color: #ffffff;
    }
  }

  @media screen and (min-width: 501px) {
    .section-line {
      width: 240px;
      height: 135px;
      padding: 5px 20px;
      margin: 2.5px auto 2.5px auto;
      cursor: pointer;
      background-color: #718093;
    }
    .section-line:hover {
      opacity: 0.2;
    }
    .section-time {
      font-size: 20px;
    }
    .section-info {
      margin-left: 10px;
      font-size: 16px;
      color: #ffffff;
    }
  }
</style>