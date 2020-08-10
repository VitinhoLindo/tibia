const BaseController = require('./BaseController');

class IcoController extends BaseController {
    constructor(request, response) {
        super(request, response);
    }

    async _send() {
        let app = this.request.getApp();
        return this.sendFile(app.icoRepository(this.request.params.file));
    }
}

module.exports = IcoController;