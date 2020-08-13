const BaseController = require('./BaseController');

class MonitController extends BaseController {
  constructor( request, response) {
    super( request, response);
  }

  async getMonit() {
    let validate = this.Validator.make(this.request.query, {
      initialDate: 'required|datetime',
      finalDate: 'required|datetime'
    });

    if (validate.fails()) {
      this.defaultResponseJSON(validate.modelResponse());
      this.resEnd();
      return;
    }

    let app   = this.request.getApp();
    let monit = await app.getMonit({
      initial: new Date(this.request.query.initialDate),
      final  : new Date(this.request.query.finalDate)
    });

    this.defaultResponseJSON({ result: monit });
    this.resEnd();
    return;
  }
}

module.exports = MonitController;