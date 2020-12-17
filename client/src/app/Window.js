import Storage from './Storage'

class Window extends Storage {
  constructor() { super(); }

  navigatorLanguage() {
    return this.window.navigator.language;
  }
}

export default Window