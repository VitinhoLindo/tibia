const ResponseModel = require('./ResponseModel');
const HttpUtil      = require('./HttpUtil');

const currentTime = function () {
  return new Date().getTime();
}

class BaseHttp extends HttpUtil {
  constructor(request, response) { super(request, response); }

  all() {
    let all = {};

    if (this.request.query && this.request.query.constructor.name == 'Object') all = Object.assign({}, all, this.request.query);
    if (this.request.params && this.request.params.constructor.name == 'Object') all = Object.assign({}, all, this.request.params);
    if (this.request.body && this.request.body.constructor.name == 'Object') all = Object.assign({}, all, this.request.body);

    return all;
  }

  _user() {
    return this.app.getUser(this.request);
  }

  setStatus(code) {
    this.response.status(code);
  }

  setMessage(message) {
    this.response.statusMessage = message;
  }

  resJson(data) {
    this.response.json(data);
    return data;
  }

  resEnd() {
    this.response.end();
  }

  defaultResponseJSON(_response = ResponseModel) {
    if (!_response.requestStatus) _response.requestStatus = 200;
    if (!_response.requestMessage) _response.requestMessage = 'Success';
    if (!_response.time) _response.time = currentTime();
    if (!_response.message) _response.message = 'Success response message';
    if (!_response.code) _response.code = 200;
    if (!_response.result) _response.result = {};
    if (!_response.status) _response.status = (
      _response.code >= 200 &&
      _response.code < 300
    ) ? 'success' : 'error';
    
    this.resJson({
      time: _response.time,
      message: _response.message,
      code: _response.code,
      status: _response.status,
      result: _response.result
    });
    this.setStatus(_response.requestStatus);
    this.setMessage(_response.requestMessage);
    this.resEnd();
  }

  sendError(error) {
    try {
      if (error.constructor.name == 'Object') {
        return this.defaultResponseJSON(error);
      }
      return this.defaultResponseJSON({ code: 500, message: 'internal server error' });
    } catch (error) { 
      this.request.socket.destroy(err => {});
    }
  }

  sendFile(path) {
    this.response.sendFile(path, (err) => {
      if (err == undefined) this.resEnd();
      else {
        this.defaultResponseJSON({
          code: 404,
          message: 'error in response file'
        });
        this.resEnd();
      }
    });
  }
}

module.exports = BaseHttp;