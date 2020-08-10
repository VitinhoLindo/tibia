<template>
  <div class="section-modal" v-on:click="close">
    <div class="content">
      <div class="show-information" v-on:click="closeSection">back</div>
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

        <div v-if="data.npcs">
          <div v-for="(npc, index) in data.npcs" v-bind:key="index">
            <div class="image flex">
              <img class="tag" v-bind:src="npc.profile.data" v-bind:alt="npc.profile.alt">
            </div>
            <div style="text-align: center;">
              <div>{{ `Name: ${npc.name}` }}</div>
              <div>{{ `Inf: ${npc.information || '...'}` }}</div>
            </div>

            <div class="table-iten">
              <div class="name-line">Name</div>
              <div class="price-line">Price</div>
              <div class="value-line">Value</div>
            </div>
            <div class="table-iten" v-for="(item, index) in npc.buy" v-bind:key="index">
              <div class="name-line">{{ item.name }}</div>
              <div class="price-line">{{ item.price }}</div>
              <div class="value-line">{{ item.price * item.total }}</div>
            </div>
          </div>
        </div>

        <div class="bottom-space"></div>
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
.bottom-space {
  width: 100%;
  height: 50px;
}
.image {
  width: 100%;
}
.image .tag {
  margin: auto;
}

.table-iten:nth-child(even) {background-color: #718093;}

.name-line {
  text-align: center;
  width: 225px;
}

.price-line {
  text-align: center;
  width: 50px;
}

.value-line {
  text-align: center;
  width: 90px;
}

.table-iten {
  display: flex;
}

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
.show-information {
  margin: 5px 0px;
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

.section-modal .content {
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
