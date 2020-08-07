<template>
  <div class="section-modal" v-on:click="close">
    <div class="content">
      <div class="time">
        <div>{{ getHour() }}</div>
        <div>{{ getFinalHour() }}</div>
        <div>{{ getTime() }}</div>
        <div v-if="information" class="informations">
          <div>{{ getExperience() }}</div>
          <div>{{ getBalance() }}</div>
          <div>{{ getSupplies() }}</div>
          <div>{{ getLoot() }}</div>
          <div>{{ getHealing() }}</div>
        </div>
        <div>
          <div v-if="!information" class="show-information" v-on:click="informationController">
            show information
          </div>
          <div v-if="information" class="show-information" v-on:click="informationController">
            close information
          </div>
        </div>
      </div>
      <div class="data">
        <div>
          Killed:
          <div class="monsters">
            <div class="monster flex" v-for="(monsterInfo, index) in data.killed" v-bind:key="index">
              <div class="total">
                {{ monsterInfo.total + "x" }}
              </div>
              <div class="name">
                {{ monsterInfo.monster }}
              </div>
            </div>
          </div>
        </div>
        <div>
          Looted:
          <div class="monsters">
            <div class="monster flex" v-for="(monsterInfo, index) in data.looted" v-bind:key="index">
              <div class="total">
                {{ monsterInfo.total + "x" }}
              </div>
              <div class="name">
                {{ monsterInfo.looted }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    data: {
      type: Object,
      required: true
    },
    closeSection: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    information: false
  }),
  methods: {
    close(event = MouseEvent) {
      if (event.srcElement.className == 'section-modal') {
        this.closeSection();
      }
    },
    informationController() {
      this.information = !this.information;
    },
    getHour() {
      let date = new Date(this.data.section.date);
      return `Hunting date : ${date.toLocaleString()}`;
    },
    getTime() {
      return `Hunting duration: ${this.data.section.time}`;
    },
    getFinalHour() {
      let date  = new Date(this.data.section.date);
      let [hour, time] = this.data.section.time.split(':');

      let _date = new Date(
        date.getFullYear(), 
        date.getMonth(), 
        date.getDate(),
        hour,
        time,
        date.getSeconds()
      );
      return `Hunting end time: ${_date.toLocaleString()}`;
    },
    getExperience() {
      return `Experiencia: ${this.data.experience}`;
    },
    getLoot() {
      return `Loot: ${this.data.loot}`;
    },
    getSupplies() {
      return `Supplie: ${this.data.supplies}`;
    },
    getBalance() {
      return `Balance: ${this.data.loot - this.data.supplies}`;
    },
    getHealing() {
      return `Healing: ${this.data.healing}`;
    },
    getMonsterLabel(info) {
      return `${info.total}x ${info.monster}`;
    }
  }
}
</script>

<style>
.time {
  margin: 20px auto;
}
.time div {
  margin: 5px;
}
.flex {
  display: flex;
}

.data .monsters {
  margin-bottom: 20px;
}
.monsters {
  border: 1px solid #718093;
}

.monster:nth-child(even) {background-color: #718093;}

.monster .total {
  width: 100px;
  text-align: center;
}

.show-information {
  color: #3498db;
  cursor: pointer;
}
.show-information:hover {
  opacity: 0.7;
}
.informations {
  font: italic;
  font-size: 14px;
  color: #cccccc;
}

.section-modal {
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

.content {
  width: 350px;
  height: 100%;
  border: 1px solid #888888;
  background-color: #353b48;
  color: #ffffff;
  position: fixed;
  padding: 20px;
  overflow: auto;
  cursor:default;
}
</style>
