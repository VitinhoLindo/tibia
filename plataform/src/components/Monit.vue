<template>
  <div class="app-monit" v-on:click="bodyClick">
    <div class="app-monit-content" v-bind:style="style">
      <div class="flex">
        <div>
          {{ labels.initial }} <input type="date" v-model="initialDate">
        </div>
        <div>
          {{ labels.final }} <input type="date" v-model="finalDate">
        </div>
      </div>

      <div class="content" v-if="Object.keys(monit).length">
        <div class="status-content">
          <div class="total-time">
            Total hour :
            {{ monit.section.time }}
          </div>
          <div class="total-experience">
            Total experience :
            {{ getNumber(monit.experience, '.') }}
          </div>
          <div class="total-supplies">
            Total supplies :
            {{ getNumber(monit.supplies) }}
          </div>
          <div class="total-loot">
            Total loot :
            {{ getNumber(monit.loot) }}
          </div>
          <div class="total-profit">
            Total profit :
            {{ getNumber(monit.loot - monit.supplies) }}
          </div>
          <div class="total-damage">
            Total damage :
            {{ getNumber(monit.damage, '.') }}
          </div>
          <div class="total-healing">
            Total healing :
            {{ getNumber(monit.healing, '.') }}
          </div>
        </div>

        <div v-if="monit.killed.length" class="killed-content-division">
          Killed: 
          <div class="killed-content">
            <div class="killed"
              v-for="(killed, index) in monit.killed" 
              v-bind:key="index + 'killed'">
              <div class="total">{{ killed.total + 'x' }}</div>
              <div class="value">{{ killed.monster }}</div>
            </div>
          </div>
        </div>

        <div v-if="monit.looted.length" class="looted-content-division">
          Looted: 
          <div class="looted-content">
            <div class="looted" v-for="(loot, index) in monit.looted" v-bind:key="index + 'looted'">
              <div class="total">{{ loot.total + 'x' }}</div>
              <div class="value">{{ loot.looted }}</div>
            </div>
          </div>
        </div>

        <div v-if="monit.npcs">
          <div class="npcs" v-for="(npc, index) in monit.npcs" v-bind:key="index">
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
              <div class="price-line">{{ getNumber(item.price) }}</div>
              <div class="value-line">{{ getNumber(item.price * item.total) }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="btn-monit" v-on:click="getMonit">
        {{ labels.send }}
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';

export default {
  name: '',
  props: {
    add: {
      type: Function,
      required: true
    },
    loading: {
      type: Function,
      required: true
    },
    refresh: {
      type: Function,
      required: true
    },
    shared: {
      type: Object,
      required: true
    },
    getNumber: {
      type: Function,
      required: true
    }
  },
  mounted() {
    this.setInitialDate();
  },
  data() {
    return {
      initialDate: '',
      finalDate: '',
      monit: {},
      labels: {
        send: 'get',
        initial: 'Initial Date',
        final: 'Final Date'
      },
      style: {
      }
    };
  },
  methods: {
    setInitialDate() {
      let date = new Date();

      let year  = date.getFullYear();
      let month = date.getMonth() + 1;
      let day   = date.getDate() + 1;

      if (month < 10) month = '0' + month;
      if (day   < 10) day   = '0' + day;

      this.initialDate = `${year}-${month}-${day}`;
      this.finalDate   = `${year}-${month}-${day}`;
    },
    bodyClick(event) {
      if (event.srcElement.className == 'app-monit') {
        this.add();
      }
    },
    getDate(dateString) {
      let [year, month, day] = dateString.split(/\-/g);

      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    },
    async getMonit() {
      this.loading(true);

      try {
        let { data } = await Axios({
          url: `${this.shared.path}/monit`,
          method: 'GET',
          params: {
            initialDate: this.getDate(this.initialDate),
            finalDate: this.getDate(this.finalDate)
          }
        });

        if (data.status == 'error') throw data.message;

        this.monit = data.result;
        if (
          data.result.killed.length || 
          data.result.looted.length
        )                                     this.style.height = `94%`;
        else                                  delete this.style.height;
      } catch (error) {
        console.error(error);
        alert('failure in get monit');
        this.add();
      }

      this.loading(false);
    }
  }
}
</script>

<style>

.npcs {
  margin: 10px auto;
  border: 1px solid #718093;
  padding: 10px 0px 0px 0px;
}

.app-monit {
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

.app-monit .app-monit-content {
  width: 325px;
  border: 1px solid #888888;
  background-color: #353b48;
  color: #ffffff;
  position: fixed;
  padding: 20px;
  overflow: auto;
  cursor: default;
}

.app-monit .app-monit-content .flex {
  text-align: center;
}

.app-monit .app-monit-content .btn-monit {
  margin: 20px auto 0px auto;
  width: 60px;
  height: 25px;
  font-size: 20px;
  text-align: center;
  background-color: #718093;
  margin-bottom: 2px;
  padding: 3px 0px;
  cursor: pointer;
  -webkit-border-radius: 5px;
}

.app-monit .app-monit-content .btn-monit:hover {
  box-shadow: 0px 0px 10px 0px #718093;
}

.app-monit .app-monit-content .content {
  margin-top: 5px;
  /* border: 1px solid #718093; */
}

.app-monit .app-monit-content .content .status-content {
  margin: 20px 0px;
}


.app-monit .app-monit-content .content .killed-content-division {
  margin: 20px auto;
}
.app-monit .app-monit-content .content .killed-content {
  border: 1px solid #718093;
}
.app-monit .app-monit-content .content .killed-content .killed {
  display: flex;
}
.app-monit .app-monit-content .content .killed-content .killed .total {
  width: 90px;
  text-align: center;
}
.app-monit .app-monit-content .content .killed-content .killed .value {
  width: 220px;
  text-align: center;
}
.app-monit .app-monit-content .content .killed:nth-child(even) {background-color: #718093;}


.app-monit .app-monit-content .content .looted-content-division {
  margin: 20px auto;
}
.app-monit .app-monit-content .content .looted-content {  
  border: 1px solid #718093;
}
.app-monit .app-monit-content .content .looted-content .looted {
  display: flex;
}
.app-monit .app-monit-content .content .looted-content .looted .total {
  width: 90px;
  text-align: center;
}
.app-monit .app-monit-content .content .looted-content .looted .value {
  width: 220px;
  text-align: center;
}
.app-monit .app-monit-content .content .looted:nth-child(even) {background-color: #718093;}
</style>