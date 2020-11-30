class ResponseModel {
  requestStatus = 0;
  requestMessage = '';
  time = 0;
  message = '';
  result = {};
  code = 0;
  status = '';

  constructor() { }
}

module.exports = new ResponseModel;