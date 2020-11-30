const Config     = require('./config');
const Middleware = require('./middleware');
const e = require('express');

class App extends Config {
    constructor(_dirname) {
        super();
        this.dirname = _dirname;
        this.on('print', this.print);
        this.on('close-server', this.closeServer);
    }

    print(opt = [{ message: '', color: '' }]) {
        let message = '';

        opt.forEach((a, index) => {
            if (index == 0) message += `${this.getColor(a.color)} ${a.message}`;
            else            message += `${this.getColor(a.color)} ${a.message}`;
        });

        console.log(message);
    }

    async closeServer(opt) {
        this.print(opt);
        this.process.exit();
    }

    async listen() {
        await this.setConfig();
        const express = this.express();
        Middleware(express, this);
        const server  = this.http.createServer(express);
        server.listen(this.config, () => {
            this.emit('print', [{ message: 'server open in', color: 'blue' }, {message: `http://localhost:${this.config.port}/`, color: 'magenta'}])
        });
    }
}

module.exports = App;