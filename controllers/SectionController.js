class SectionController {
    constructor(request) {
        this.request = request;
    }

    async getSectionData() {
      let app = this.request.getApp();
      return await app.getSectionData();
    }
}

module.exports = SectionController;