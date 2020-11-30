const defaults = {
  dir: '/',
  public: 'public/',
  html: 'css/',
  js: 'public/',
  css: 'css/',
  ico: 'ico/',
  image: 'image/',
  gif: 'gif/',
  doc: 'doc/',
  video: 'video/',
  ssl: 'ssl/',
  // js: 'public/',
  // css: 'css/',
  // ico: 'ico/',
  // image: 'image/',
  // gif: 'gif/',
  // doc: 'doc/',
  // video: 'video/',
};
const linux = defaults;

const windows = {
  dir: '\\',
  public: 'public\\',
  html: 'css\\',
  js: 'public\\',
  css: 'css\\',
  ico: 'ico\\',
  image: 'image\\',
  gif: 'gif\\',
  doc: 'doc\\',
  video: 'video\\',
  ssl: 'ssl\\',
};


class Path {
  plataform = {};
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
    if (plataform == 'win32') return windows;
    else                      return linux;
  }

  constructor(plataform) {
    this.plataform = this.serverPlataforms(plataform);
    this.defaults  = this.getDirs(this.plataform);
  }
}

module.exports = Paths;