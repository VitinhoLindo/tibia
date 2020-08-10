const BaseController = require('./BaseController');

class CssController extends BaseController {
    constructor(request, response) {
        super(request, response);
    }

    async _send() {
        let app = this.request.getApp();
        return this.sendFile(app.cssRepository(this.request.params.file));
    }
}

module.exports = CssController;