const MyEvent = require('./event');

class Repository extends MyEvent {
    express     = require('express');
    http        = require('http');
    crypto      = require('crypto');
    os          = require('os');
    process     = require('process');
    fs          = require('fs');
    plataform   = '';
    dirname     = '';
    repositorys = {};

    constructor() {
        super();
    }

    setPlataformSetings() {
        this.plataform = this.os.platform();

        switch (this.plataform) {
            case 'android':
            case 'linux':
                this.repositorys = {
                    dir: '/',
                    config: {
                        dir: '/config.json'
                    },
                    npcs: {
                        dir: '/database/npcs'
                    }
                };
                break;
            case 'windows':
                this.repositorys = {
                    dir: '\\',
                    config: {
                        dir: '\\config.json'
                    },
                    npcs: {
                        dir: '\\database\\npcs'
                    }
                };
                break;
            default:
                this.emit('print', { message: 'plataform not supported', color: 'red' });
                this.emit('close-server');
                break;
        }
    }
}

module.exports = Repository;