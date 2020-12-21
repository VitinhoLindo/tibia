const Variables = require('../lib/Variables');
const UUID      = require('./UUID');

class ValidatorResponse {
  header = {
    alg: '',
    typ: ''
  };

  payload = {
    sub: '',
    jti: '',
    iat: 0,
    exp: 0
  }

  certificate = {
    header: {
      alg: '',
      typ: ''
    },
    payload: {
      sub: '',
      jti: '',
      iat: 0,
      exp: 0
    }
  }

  constructor(header, payload, certificate) {
    this.header      = header;
    this.payload     = payload;
    this.certificate = certificate;
  }

  static instance(header, payload, certificate) {
    return new ValidatorResponse(header, payload, certificate);
  }
}

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
    return `${header}.${payload}.${Buffer.from(certificate, 'hex').toString('base64')}`;
  }

  static instance() {
    return new JWT();
  }

  async validate(app, token, extract = false) {
    if (!token) return (extract) ? null: false;
    token = token.replace('Bearer ', '');

    try {
      let [header, payload, certificate] = token.split(/\./g);
      let _certificate = await app.encrypt(`${header}.${payload}`);

      header      = JSON.parse(app.base64ToString(header));
      payload     = JSON.parse(app.base64ToString(payload));
      certificate = app.base64ToHex(certificate);

      if (!extract) {
        if (certificate != _certificate) return false;
        else return true;
      } else {
        if (certificate != _certificate) return null;
        return ValidatorResponse.instance(header, payload, { header: header, payload: payload });
      }
    } catch (error) {
      return (extract) ? null: false;
    }
  }

  expiration(app = ValidatorResponse.instance(), server = ValidatorResponse.instance()) {
    let validated   = true;
    let headerKeys  = Object.keys(server.header);
    let payloadKeys = Object.keys(server.payload);
    let currentDate = new Date();

    for(let key of headerKeys)
      if (app.header[key] != server.header[key]) 
        validated = false;
      else if (app.certificate.header[key] != server.certificate.header[key])
        validated = false;
      else if (app.certificate.header[key] != server.header[key])
        validated = false;

    for(let key of payloadKeys)
      if (app.payload[key] != server.payload[key]) 
        validated = false;
      else if (app.certificate.payload[key] != server.certificate.payload[key])
        validated = false;
      else if (app.certificate.payload[key] != server.payload[key])
        validated = false;

    if (!validated) return true;

    let expiration = new Date(server.payload.exp);
    return (currentDate > expiration) ? true: false;
  }
}

module.exports = JWT;