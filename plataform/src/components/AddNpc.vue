<template>
  <div class="add-npc" v-on:click="bodyClick">
    <div class="content">
      <div class="flex">
        <div class="input">
          <div class="line">
            <div>
              Name
            </div>
            <div>
              <input type="text" v-model="input.name">
            </div>
          </div>
          <div class="line">
            <div>
              Image
            </div>
            <div>
              <input type="file" v-on:change="fileChange">
            </div>
          </div>
          <div class="line">
            <div>
              Alt Img
            </div>
            <div>
              <input type="input" v-model="input.profile.alt">
            </div>
          </div>
          <div class="line">
            <div>
              Infomation
            </div>
            <div>
              <input type="input" v-model="input.information">
            </div>
          </div>
        </div>

        <div class="inputed">
          <img id="img-npc" v-bind:src="input.profile.data" v-bind:alt="input.profile.alt">
          <div class="alt-name">{{ input.name }}</div>
          <div class="alt-info">{{ input.profile.alt }}</div>
          <div class="alt-info">{{ input.information }}</div>
          <div class="button-send-npc" v-on:click="sendNpc">
            Add
          </div>
        </div>
      </div>
      <div class="item Add">
        <div class="show-information-add" v-if="on.manual || (!on.server && !on.manual)" v-on:click="itensInput('server')">
          server add
        </div>
        <div class="show-information-add" v-if="on.server || (!on.server && !on.manual)" v-on:click="itensInput('manual')">
          manual add
        </div>
        <div class="show-information-add" v-if="on.server || on.manual" v-on:click="itensInput('reset')">
          reset
        </div>

        <textarea v-if="on.server" v-model="input.server">
        </textarea>

        <div v-if="on.manual">
          <div v-for="(iten, index) in input.itens" v-bind:key="index" class="input-item">
            <div class="flex">
              <div class="add-item">
                <div>
                  Name
                </div>
                <input type="text" v-model="iten.name">
              </div>
              <div class="add-item">
                <div>
                  Price
                </div>
                <input type="text" v-model="iten.price">
              </div>
              <div class="inline">
                <img v-on:click="addItem(index)" class="img-npc-data" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMbSURBVFiFxZdPaFRXFMZ/5z4nMc5MkkY7baHVTAxEK9HBhdCldlGYurBduiiUImKjLgRRW2qlixA3LoQJiIirSkEwG/vHhYEWzMZFIzXQtEmf1VXGGjLkzWgmefd0MQmdZCYz76X5863u4553vo/L/c45VwiIrhvP47Ovmg6r6CHQfSDtQOv89hSIi+gjhcHGhlffj372+nSQvFIvYMe1/FuOby8qfAJsCai3ANwyai+P97SMrUjA21e0KdLoXUDkDGg0IPFSzApyxcxFvx47LTOBBezM5DqtMXdQuldIvAgKQxKRj91jsYm6AtozXkpE7wGJ1SAvwzMjpMdPxB8vK2BnJtdpxTxYA/IFPCUiB8pPwiws2m/qZivm9hqSA2ynqAOdV7WxQoAUvC+AVJhsu7cKu9rqGmkxhPfmnPyl/z4pWc34+meY276rTRj4qAGAIwNFRic1jIyi4/jvjh1vHTcAjm8vhrVae4tgBIxAsiXkKUCDb51zAKbz6ovm+SKzvlA5uieTjRnrNH5I8Aq3mgqiBdOUNqXavkFQ3jelxrJh2LsJJFkrYvdWYUdz5SVLJUzVdTme5JTfa7ujQ5L90zNAQ7XdBauZ0Je8BKt1LTpTXfo6QpL908+BbcsFdLVJVZ+nEoZPux0Abv7mM5y1FTFuTusVqOwmUBdkWQGjk7WSlAQMZy0/uZUCAuAvg8jwSv5cDYjyyCgMbpQAFe6bqH15F/DWn17yW/Tlj2akJ+EB362/AP12pCfhGQCj9jIwG+b3JznFasnrbi5UKwaYsb7fB2UjWUe/16fouTBZuuaHkZCzAECv+3n8SyibiF5zol8h/BImS22LVofCkDMX+2bhe1GFSV733mBWHwLvhMoaHMsPpQDusdiEEdLAs7UgdyzppW+Dil4wfiL+OOLofuDn1WJWGCIiB8ZOxkeW7lVtRn8cb/7HmYt9oCp9QPF/cBeB3ui22MFqryII8Djd3j/V4YhzHpWjIQZXD7hlfb/v71Otbq3AwJ1+TyYbK5imtFgOqUgKNMmS57mgvyoMFvL5HybOvpkPkvdfrW4cS//Z7KYAAAAASUVORK5CYII=">
                <img v-on:click="removeItem(index)" class="img-npc-data" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAsQAAALEBxi1JjQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAO4SURBVFiFvZdLTFxlFMd/594LOMwAjS/AtEVNN5poiQYM6WYEFcpjIYsubOLKaNImfSVSNbEaF6alESxJXdi13ZjYBcXSSUA0gaYPom2qG1EibVJpFVs7U2Dm3u+4GB4zMJ17Qeh/de/Muef3/17n+z4hoG5t21YSKkq1qlAvsBXlSYQNACi3ERlX5TLC4MyM0/fY8PDdIHnFLyDR+GKl8exDorwJFAf0e0/hpPHsI2VD58ZWZUDr6kLxYvO+oAeAcEDwUqUQusIFUx/JmbHZwAbuROu22Lb7DchzqwRnSWFEkPbIwPlJXwPxV2uqMXIWeHwt4Bm6prZpLoldunpfA+mWe8PrAJ/XBEhtZk9Y8w8ajT5k297X6wgH2KzoKd2+pWiZgbg9/QFQvY5wAATqErOPfJzxnl5q6tq/svrZvlIlXfWe3TA4+psFYDz7kC+84glkY5VvZtlUBeWVfmGFNs5BAPl7+0ulRUm9Qb4iU15J4YmvwHFwj3Vizp7OGWY1tuLs7YCUS/LtnTB5I5+JxD2vuMIqmtWWvHBACgrBcUAsnL0dWE1ty+FNbWm4WOA4SEFBvpQA4ZCTaLZUqPeL1Ot/4H5+BNSkTezpwG5tX4S/1oKz5900XBXvi270+oRfWlAaHIGt/pFgYn24gLPvIIiFvWt/OkdyduE3VPGOd+H1nQqSEpDnJd5Qewt4NOAX6a5eaK2Zy5N+dnuOYvp7g6YCuGkBpSv5wvT3Zg3HYsu7VwoHKLP8YwJKfHf2nLKAf1f0QVNbxpibuZ4Q7F37cq4OH92xgPHA8KWz/Xj38tXR8npgusLvjqr8JKI1geD3me1Zq2P3AYCgK+GyhTDoFyWbqrK63e3pzAKYWB9uz9HF4di9P1DZRhmwpr3QaYF43rhkElIuGJMuxTlmu+nvxT3WmTaRctFUzhNYphLTpviMANxtqD0h8Fbe8PIKpKDQt8LJxs1oKgmTf+aNU/TLkoGL7wgsnIR+AXwL+Bpp1rZ5JhS7MG4BlA2dG0PoekBwFD4LxS6MQ8aJKPyP9yHwwwOAj0QKpz6Zf18wIKOjKZAdwLV15E8I0p55R8gqxZGB85Nqm+Z1MjGhRpuX3g2W7QUlsUtXjee9gPL9WpEVRkBqS767+PPS/3JuRqVDo3+Fi6YaUTkMJP8HO6nwaeThxMu5bkUQ4HI680rN0yljvSeibxDw1CwQN+hJx5bD87M9T2ww3YxGIyEn0YxKvQjVKE/B3PUcbiOMK/yIYTDizHwrsSuJIHn/A/NYeWJNjN7eAAAAAElFTkSuQmCC">
              </div>
            </div>
          </div>
        </div>
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
    }
  },
  data() {
    return {
      on: {
        manual: false,
        server: false
      },
      input: {
        name: '',
        profile: {
          data: '',
          alt: ''
        },
        information: '',
        server: '',
        itens: []
      }
    };
  },
  methods: {
    async sendNpc() {
      let body = {};

      if (this.input.name.length < 3) { 
        alert('please inform name of npc');
        return true;
      }
      if (!this.input.profile.data) {
        alert('please inform profile to npc');
        return true;
      }
      if (this.input.profile.alt.length < 3) {
        alert('please inform alt to npc');
        return true;
      }
      if (this.input.information < 3) {
        alert('please inform information of npc');
        return true;
      }
      if (!this.on.manual && !this.on.server) {
        alert('please inform itens to npc with sell');
        return true;
      }
      if (this.on.manual && !this.input.itens.length) {
        alert('please inform itens npc with sell');
        return true;
      } else {
        body.itens = this.input.itens;
      }
      if (this.on.server && !this.input.server.length) {
        alert('please inform itens to npc with sell');
        return true;
      } else {
        body.server = this.input.server;
      }

      window.document.body.style.cursor = 'progress';

      body.name        = this.input.name;
      body.image       = this.input.profile.data;
      body.alt         = this.input.profile.alt;
      body.information = this.input.information;

      try {
        let { data } = await Axios({
          url: '/npc',
          method: 'POST',
          data: body
        });

        if (data.status == 'error') throw data.message;

        this.loading(true);
        setTimeout(() => {
          this.refresh(true, true);
          this.add();
          window.document.body.style.cursor = 'default';
        }, 1000);
      } catch (error) {
        console.error(error);
        window.document.body.style.cursor = 'default';
        alert('failure in create npc', error);        
      }
    },
    itensInput(type) {
      if (type == 'server') {
        this.on.manual = false;
        this.on.server = true;
        this.input.itens = [];
      } else if (type == 'manual') {
        this.on.server = false;
        this.on.manual = true;
        this.input.server = '';
        this.input.itens = [{name: '', price: ''}];
      } else if (type == 'reset') {
        this.input.itens = [];
        this.input.server = '';
        this.on.server = false;
        this.on.manual = false;
      }
    },
    addItem(index) {
      this.input.itens.splice(index + 1, 0, {name: '', price: ''});
    },
    removeItem(index) {
      this.input.itens.splice(index, 1);

      if (!this.input.itens.length)
        this.itensInput('reset');
    },
    bodyClick(event = MouseEvent) {
      if (event.srcElement.className == 'add-npc') {
        this.add();
      }
    },
    fileChange(event = InputEvent) {
      var file = event.srcElement.files[0];

      if (file) {
        var fileReader = new FileReader();
        fileReader.onload = (_file) => {
          this.input.profile.data = _file.target.result;
          // console.log(this.input.profile.data);
        }

        fileReader.readAsDataURL(file);
      } else {
        this.input.profile.data = '';
      }
    }
  }
}
</script>

<style>
textarea {
  resize: none;
  width: 97.5%;
  height: 100px;
}
.button-send-npc {
  cursor: pointer;
  background-color: #718093;
  text-align: center;
  -webkit-border-radius: 4px;
  width: 70px;
  margin: 0px auto;
  padding: 4px;
}

.line {
  margin: 5px 0px;
}
.line div {
  margin: 2.5px 0px;
}
.inline {
  display: inline-block;
  padding-top: 20px;
  padding-left: 2px;
  padding-right: 2px;
}
.add-item input {
  width: 172px;
}
.show-information-add {
  color: #3498db;
  width: 100px;
  cursor: pointer;
}
.show-information-add:hover {
  opacity: 0.5;
}
.img-npc-data {
  width: 15px;
  height: 15px;
  margin: 0px 1px;
  cursor: pointer;
}
.img-npc-data:hover {
  opacity: 0.5;
}
.add-npc {
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

.add-npc .content {
  width: 400px;
  border: 1px solid #888888;
  background-color: #353b48;
  color: #ffffff;
  position: fixed;
  padding: 20px;
  overflow: auto;
  cursor:default;
}
.add-npc .content .input {
  width: 275px;
}
.add-npc .content .inputed {
  width: 125px;
}

.add-npc .content .inputed #img-npc {
  width: 50px;
  height: 50px;
}

.add-npc .content .inputed .alt-info {
  width: 100%;
}
.add-npc .content .inputed .alt-name {
  width: 100%;
}

.add-npc .content .inputed .alt-info {
  font-size: 11px;
  color: #aaaaaa;
}

.add-npc .content .flex .inputed {
  text-align: center;
}
</style>