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
    listenTime      = 5000;

    constructor() {
        super();
    }

    cssRepository(file) {
        return `${this.dirname}${this.repositorys.css.dir}${file}`;
    }

    jsRepository(file) {
        return `${this.dirname}${this.repositorys.js.dir}${file}`;
    }

    htmlRepository(file) {
        return `${this.dirname}${this.repositorys.html.dir}${file}`;
    }

    icoRepository(file) {
        return `${this.dirname}${this.repositorys.ico.dir}${file}`;
    }

    npcRepository() {
        return `${this.dirname}${this.repositorys.npcs.dir}${this.repositorys.dir}`;
    }
    
    npcRepositoryAndFile() {
        return `${this.dirname}${this.repositorys.npcs.dir}${this.repositorys.dir}${this.repositorys.npcs.file}`;
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
                        dir: '/database/npcs',
                        file: '@name@.json'
                    },
                    section: {
                        dir: '/database/sections',
                        file: '@date@.json'
                    },
                    css: {
                        dir: '/public/css/'
                    },
                    js: {
                        dir: '/public/js/'
                    },
                    html: {
                        dir: '/public/html/'
                    },
                    ico: {
                        dir: '/public/ico/'
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
                        dir: '\\database\\npcs',
                        file: '@name@.json'
                    },
                    section: {
                        dir: '\\database\\sections',
                        file: '@date@.json'
                    },
                    css: {
                        dir: '\\public\\css\\'
                    },
                    js: {
                        dir: '\\public\\js\\'
                    },
                    html: {
                        dir: '\\public\\html\\'
                    },
                    ico: {
                        dir: '\\public\\ico\\'
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