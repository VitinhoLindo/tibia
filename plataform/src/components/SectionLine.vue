<template>
  <div class="section-line" v-on:click="lineClick">
    <div class="content">
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
.section-line {
  width: 250px;
  height: 150px;
  margin: 2.5px 2.5px 2.5px 2.5px;
  cursor: pointer;
  background-color: #718093;
}
.section-line .content {
  margin: 10px;
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
</style>