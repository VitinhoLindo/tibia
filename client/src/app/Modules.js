import Variables from './Variables'

class Modules extends Variables {
  constructor() {
    super();
    
    this.window  = window;
    this.crypto  = this.window.crypto;
    this.storage = this.window.localStorage;
  }
}

export default Modules;