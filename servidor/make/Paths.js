module.exports = {
  '--controller': {
    controller: {
      path: './http/controller/@controllername@.js',
      content: `const @servicename@ = require('../service/@servicename@');\n\n` +
               `class @controllername@ extends @servicename@ {\n\n` +
               `  constructor(request, response) { super(request, response) }\n\n`+
               `  static using(request, response) {\n` +
               `    return new @controllername@(request, response);\n` +
               `  }\n\n`+
               `  async option() {\n` +
               `    return this.defaultResponseJSON();\n` +
               `  }\n\n` +
               `  async get() {\n` +
               `    return this.defaultResponseJSON();\n` +
               `  }\n\n` +
               `  async post() {\n` +
               `    return this.defaultResponseJSON();\n` +
               `  }\n\n` +
               `  async put() {\n` +
               `    return this.defaultResponseJSON();\n` +
               `  }\n\n` +
               `  async delete() {\n` +
               `    return this.defaultResponseJSON();\n` +
               `  }\n` +
               `}\n\n` +
               `module.exports = @controllername@;`
    },
    service: {
      path: './http/service/@servicename@.js',
      content: `const Base = require('./Base');\n\n` +
               `class @servicename@ extends Base {\n`+
               `  constructor(request, response) { super(request, response) }\n` +
               `}\n\n` +
               `module.exports = @servicename@;`
    },
    api: {
      path: '/http/api/@apiname@.js',
      content: `const { Router } = require('express');\n` +
               `const route = Router();\n` +
               `const @controllername@ = require('../controller/@controllername@');\n\n` +
               `route.options('/', (request, response) => {\n` +
               `  @controllername@.using(request, response).option();\n` +
               `});\n\n` +
               `route.get('/', (request, response) => {\n` +
               `  @controllername@.using(request, response).get();\n` +
               `});\n\n` +
               `route.put('/', (request, response) => {\n` +
               `  @controllername@.using(request, response).put();\n` +
               `});\n\n` +
               `route.post('/', (request, response) => {\n` +
               `  @controllername@.using(request, response).post();\n` +
               `});\n\n` +
               `route.delete('/', (request, response) => {\n` +
               `  @controllername@.using(request, response).delete();\n` +
               `});\n\n` +
               `module.exports = {\n` +
               `  route: '/@route@',\n` +
               `  use: route\n` +
               `};`
    }
  },
  '--set': {
    'env': {
      path: '/.env'
    },
    'env-example': {
      path: '/.env-example',
      content: `PROTOCOL=http\n` +
               `HOST=127.0.0.1\n` +
               `PORT=3000\n\n` +
               `SLL_CERT=\n` +
               `SSL_KEY=\n\n` +
               `MAXREQUEST=50\n` +
               `RESETINTERVALMINUTE=1\n` +
               `REQUEST_TIMEOUT=8000\n` +
               `LIMIT_REQUEST_LENGTH=1677721600\n` +
               `LIMIT_FILE_MB=40000000\n\n` +
               `MYSQL_HOST=127.0.0.1\n` +
               `MYSQL_PORT=3306\n` +
               `MYSQL_USER=root\n` +
               `MYSQL_PASS=\n` +
               `MYSQL_DB=\n` +
               `MYSQL_TIMEOUT=15000\n\n` +
               `MYSQL_SSL_CA=\n` +
               `MYSQL_SSL_CERT=\n` +
               `MYSQL_SSL_KEY=\n\n` +
               `SECRET=@SECRET@\n` +
               `KEY=@KEY@\n\n` +
               `JWT_SECRET=@JWTSECRET@\n` +
               `JWT_KEY=@JWTKEY@\n\n` +
               `SMTP_HOST=SMTP.office365.com\n` +
               `SMTP_SERVICE=Outlook\n` +
               `SMTP_PORT=587\n` +
               `SMTP_USER=\n` +
               `SMTP_PASS=\n\n`
    }
  },
  '--model-sql': {
    path: '/app/@value@.js',
    content: `const BaseModelSql = require('./BaseModelSql');\n\n` +
             `class @model@ extends BaseModelSql {\n\n` +
             `  table = '@table@';\n` +
             `  fields = [\n` +
             `    'id'\n` +
             `  ];\n` +
             `  encrypt = [\n` +
             `  ];\n` +
             `  hash = [\n` +
             `  ];\n` +
             `  timestamp = false;\n` +
             `  relation = {};\n\n` +
             `  constructor() { super(); }\n` +
             `}\n\n` +
             `module.exports = @model@;`
  },
  '--resource-sql': {
    path: '/app/resources/@resourcename@.js',
    content: `const Base = require('./Base');\n` +
             `const @modelname@ = require('../@model@');\n` +
             `const { } = require('../../resource/fields');\n\n` +
             `class @resourcename@ extends Base {\n\n` +
             `  model = @modelname@;\n\n` +  
             `  constructor(request, response) {\n` +
             `    super(request, response);\n` +
             `    this.singularLabel('');\n` +
             `    this.pluralLabel('');\n` +
             `  }\n\n` +
             `  async fields() {\n` +
             `    return [];\n` +
             `  }\n\n` +
             `  static make(request, response) {\n` +
             `    return new @resourcename@(request, response);\n` +
             `  }\n` +
             `}\n\n` +
             `module.exports = @resourcename@;`
  },
  '--resource': {
    path: '/app/resources/@resourcename@.js',
    content: `const Base = require('./Base');\n` +
             `const { } = require('../../resource/fields');\n\n` +
             `class @resourcename@ extends Base {\n\n` +
             `  constructor(request, response) {\n` +
             `    super(request, response);\n` +
             `    this.singularLabel('');\n` +
             `    this.pluralLabel('');\n` +
             `  }\n\n` +
             `  async fields() {\n` +
             `    return [];\n` +
             `  }\n\n` +
             `  static make(request, response) {\n` +
             `    return new @resourcename@(request, response);\n` +
             `  }\n` +
             `}\n\n` +
             `module.exports = @resourcename@;`
    
  },
  '--police': {
    path: '/app/police/@policename@.js',
    content: `const BasePolice = require('./BasePolice');\n\n` +
             `class @policename@ extends BasePolice {\n\n` +
             `  constructor() { super(); }\n\n` +
             `  static link  (user)        { return true; }\n\n` +
             `  static view  (user, model) { return true; }\n\n` +
             `  static insert(user, model) { return true; }\n\n` +
             `  static update(user, model) { return true; }\n\n` +
             `  static delete(user, model) { return true; }\n\n` +
             `}\n\n` +
             `module.exports = @policename@;`
  }
};