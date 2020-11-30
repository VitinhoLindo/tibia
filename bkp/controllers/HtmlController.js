const BaseController = require('./BaseController');

class HtmlController extends BaseController {
    constructor(request, response) {
        super(request, response);
    }

    async _send() {
        let app = this.request.getApp();
        return this.sendFile(app.htmlRepository(this.request.params.file || 'index.html'));
    }
}

module.exports = HtmlController;