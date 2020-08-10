const BaseController = require('./BaseController');

class JsController extends BaseController {
    constructor(request, response) {
        super(request, response);
    }

    async _send() {
        let app = this.request.getApp();
        return this.sendFile(app.jsRepository(this.request.params.file));
    }
}

module.exports = JsController;