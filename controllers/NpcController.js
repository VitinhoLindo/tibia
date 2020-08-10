const BaseController = require('./BaseController');

class NpcController extends BaseController {
    constructor(request, response) {
        super(request, response);
    }

    async newNpc() {
        let rules = {
            name        : 'required|string|min:3',
            image       : 'required|url-encode',
            alt         : 'required|string|min:3',
            information : 'required|string|min:3',
            itens       : 'required|array|min:1',
            server      : 'required|string|min:20',
        };

        if (!this.request.body.itens && !this.request.body.server) {
            this.defaultResponseJSON({
                code: 400,
                message: 'bad request, data is missing'
            });
            this.resEnd();
            return;
        }
        else if (this.request.body.itens)  delete rules.server;
        else if (this.request.body.server) delete rules.itens ;

        let validator = this.Validator.make(this.request.body, rules);

        if (validator.fails()) {
            this.defaultResponseJSON(validator.modelResponse());
            this.resEnd();
            return;
        }

        let app = this.request.getApp();
        try {
            let body = this.request.body;
            body.dir = app.npcRepositoryAndFile();
            await app.addNewNpc(body);
        } catch (error) {
            this.defaultResponseJSON({
                code: 400,
                message: error
            });
        }
        this.resEnd();
    }
}

module.exports = NpcController;