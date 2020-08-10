const BaseController = require('./BaseController');

class SectionController extends BaseController {
  constructor(request, response) {
    super(request, response);
  }

  async getSectionData() {
    let app = this.request.getApp();

    this.resJson(await app.getSectionData());
    this.resEnd();
  }

  async newSection() {
    let validator = this.Validator.make(this.request.body, { section: 'required|string|min:15' });
    if (validator.fails()) {
      this.defaultResponseJSON(validator.modelResponse());
      return;
    }

    let app = this.request.getApp();
    try {
      await app.setNewSection(this.request.body.section);
      this.defaultResponseJSON({ });
      return;
    } catch (error) {
      this.defaultResponseJSON({ code: 400, message: error });
      return;
    }
  }
}

module.exports = SectionController;