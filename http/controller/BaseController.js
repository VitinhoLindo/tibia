const BaseHttp = require('../../resource/http/BaseHttp');

class BaseController extends BaseHttp {
  constructor(request, response) { super(request, response); }
}

module.exports = BaseController;