const Variables = require('../lib/Variables');
const UUID      = require('./UUID');

class JWT extends Variables {
  iss = '';
  alg = '';
  typ = '';

  sub  = '';
  iat  = 0;
  exp  = 0;
  jti  = "";

  constructor() { super(); }

  setHeader() {
    this.alg = this.encryptCipher;
    this.typ = "JWT";
    return this;
  }

  subject(sub = "", jti = "") {
    if (!jti) jti = UUID.instance().generate();

    this.sub = sub;
    this.jti = jti;
    return this;
  }

  // issuer(iss = "") {
  //   this.iss = iss;
  //   return this;
  // }

  setTime(arg = { expHour: 0, expMinute: 0, expSeconds: 0}) {
    let date = new Date();
    this.iat = date.getTime();

    if (arg.expHour) {
      date.setHours(date.getHours() + (parseInt(arg.expHour) || 0));
    }

    if (arg.expMinute) {
      date.setMinutes(date.getMinutes() + (parseInt(arg.expMinute) || 0));
    }

    if (arg.expSeconds) {
      date.setSeconds(date.getSeconds() + (parseInt(arg.expSeconds) || 0));
    }

    this.exp = date.getTime();
    return this;
  }

  getHeader() {
    return {
      alg: this.alg,
      typ: this.typ
    };
  }

  getPayload() {
    return {
      sub: this.sub,
      jti: this.jti,
      iat: this.iat,
      exp: this.exp
    };
  }

  async generate(app) {
    let header      = app.stringToBase64(JSON.stringify(this.getHeader()));
    let payload     = app.stringToBase64(JSON.stringify(this.getPayload()));

    let certificate = await app.encrypt(`${header}.${payload}`);

    return `${header}.${payload}.${certificate}`;
  }

  // async validate(token) {

  // }

  async readToken(token = '', app) {
    let [header, payload, cerficate] = token.split(/\./g);

    console.log(header, payload, cerficate);
  }

  static instance() {
    return new JWT();
  }
}

module.exports = JWT;