const BaseHttp = require('../../resource/http/BaseHttp');

class Base extends BaseHttp {
  constructor(request, response) { super(request, response); }
}

module.exports = Base;