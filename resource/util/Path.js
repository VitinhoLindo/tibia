const defaults = {
  __dirname: '',
  dir: '/',
  public: 'public/',
  html: 'html/',
  js: 'js/',
  css: 'css/',
  ico: 'ico/',
  image: 'image/',
  gif: 'gif/',
  doc: 'doc/',
  video: 'video/',
  ssl: 'ssl/',
  lang: 'lang/',
  mailer: 'mail/'
};

const windows = {
  __dirname: '',
  dir: '\\',
  public: 'public\\',
  html: 'html\\',
  js: 'js\\',
  css: 'css\\',
  ico: 'ico\\',
  image: 'image\\',
  gif: 'gif\\',
  doc: 'doc\\',
  video: 'video\\',
  ssl: 'ssl\\',
  lang: 'lang\\',
  mailer: 'mail\\'
};

const linux = defaults;

class Path {
  plataform = 'linux';
  dirs      = defaults;

  serverPlataforms(plataform) {
    switch (plataform) {
      case 'win32':   return 'windows';
      case 'linux':   return 'linux';
      case 'android': return 'linux';
      default:        return 'linux';
    }
  }

  getDirs(plataform) {
    if (plataform == 'windows') return windows;
    else                      return linux;
  }

  constructor() { }

  setPlataform(plataform = '') {
    this.plataform = this.serverPlataforms(plataform);
    this.dirs      = this.getDirs(this.plataform);
  }

  setDirName(__dirname = '') {
    this.dirs.__dirname = __dirname;
  }

  publicDir() {
    return `${this.dirs.__dirname}${this.dirs.dir}${this.dirs.public}`;
  }

  publicHtmlDir() {
    let path = this.publicDir();
    return `${path}${this.dirs.html}`;
  }

  publicJsDir() {
    let path = this.publicDir();
    return `${path}${this.dirs.js}`;
  }

  publicCssDir() {
    let path = this.publicDir();
    return `${path}${this.dirs.css}`;
  }

  publicIcoDir() {
    let path = this.publicDir();
    return `${path}${this.dirs.ico}`;
  }

  publicImageDir() {
    let path = this.publicDir();
    return `${path}${this.dirs.image}`;
  }

  publicGifDir() {
    let path = this.publicDir();
    return `${path}${this.dirs.gif}`;
  }

  publicDocDir() {
    let path = this.publicDir();
    return `${path}${this.dirs.doc}`;
  }

  publicVideoDir() {
    let path = this.publicDir();
    return `${path}${this.dirs.video}`;
  }

  publicLangDir(file = '') {
    let path = this.publicDir();
    path = `${path}${this.dirs.lang}`;
    return (file) ? `${path}${file}` : path;
  }

  publicMailerDir(file) {
    let path = this.publicDir();
    path = `${path}${this.dirs.mailer}`;
    return file ? `${path}${file}` : path;
  }
}

module.exports = new Path;