<template>
  <div class="chose">

    <button class="chose-btn" v-on:click="change">
      <span>{{ label }}</span>
      <div class="arrow">
        <a v-if="click" class="arrow-down"></a>
        <a v-else class="arrow-up"></a>
      </div>
    </button>
    
    <div class="option" v-if="click" v-on:mouseleave="change">
      <div class="search-field">
        <input type="text">

        <div class="values">
          <button 
            class="select-btn" 
            v-for="(value, key) in values" 
            v-bind:key="key"
            v-on:click="(event) => changeData(event, key)"
          >
            {{ value }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    values: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      input: '',
      click: false
    }
  },
  methods: {
    change(event) {
      this.click = !this.click;
    },
    changeData(event, value) {
      this.$emit('selected', value);
      this.change();
    }
  }
}
</script>

<style lang="scss" scoped>
.chose {
  width: 95%;
}

.chose .chose-btn {
  width: 100%;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  padding: 5px 5px;
  height: 100%;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  color: #444;
  line-height: 100%;
}

.chose .chose-btn:hover {
  background-color: #eeeeee;
}

.chose .chose-btn:focus {
  outline: 0;
}

.chose .chose-btn span {
  width: 90%;
}

.chose .chose-btn .arrow {
  width: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0px;
}

.chose .chose-btn .arrow .arrow-up {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: #000000 transparent transparent transparent;
}

.chose .chose-btn .arrow .arrow-down {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 5px 5px 5px;
  border-color: transparent transparent #000000 transparent;
}

.chose .option {
  position: absolute;
  margin: 1px 0px 4px 0px; 
  display: flex;
  flex-direction: column;
  -webkit-border-radius: 3px;
  background-color: #ffffff;
}

.chose .option .search-field {
  margin: 5px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.chose .option .search-field input {
  width: 90%;
  font-size: 16px;
}

.chose .option .search-field .values {
  width: 93%;
  max-height: 60px;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.chose .option .search-field .values .select-btn {
  padding: 3px;
  border:none;
  background-color: #ffffff;
  cursor: pointer;
}

.chose .option .search-field .values .select-btn:hover {
  background-color: #cccccc;
}

.chose .option .search-field .values .select-btn:focus {
  outline: 0;
}
</style>