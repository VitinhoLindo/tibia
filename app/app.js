const Config     = require('./config');
const Middleware = require('./middleware');

class App extends Config {
    ReadSection = new (require('./ReadSection'));

    constructor(_dirname) {
        super();
        this.dirname = _dirname;
    }

    async getSectionData() {
        return await this.ReadSection.getSectionData();
    }

    async listen() {
        this.ReadSection.listen(this.dirname);
        const express = this.express();
        Middleware(express, this);
        const server  = this.http.createServer(express);
        server.listen(this.config, () => {
            console.log(`server open in http://localhost:${this.config.port}/`);
        });
    }
}

module.exports = App;