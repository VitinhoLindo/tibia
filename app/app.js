const Config     = require('./config');
const Middleware = require('./middleware');

class App extends Config {
    ReadSection = new (require('./ReadSection'));

    constructor(_dirname) {
        super();
        this.dirname = _dirname;
    }

    async getNpcs() {
        let npcsDirFiles = await this.fs.readdirSync(`${this.dirname}${this.repositorys.npcs.dir}`);

        let len = 0;
        while(true) {
            let file = npcsDirFiles[len];
            if (!file) break;

            file = await this.fs.readFileSync(`${this.dirname}${this.repositorys.npcs.dir}${this.repositorys.dir}${file}`, { encoding: 'utf-8' });
            npcsDirFiles[len] = JSON.parse(file);
            len++;
        }

        return npcsDirFiles;
    }

    async getLocaleSellItem(sections, npcs) {

        let sectionsLen = 0;
        while(true) {
            let section = sections[sectionsLen];
            if (!section) break;

            let npcsLen = 0;
            while(true) {
                let npc   = npcs[npcsLen];
                let itens = [];
                if (!npc) break;
    
                let lenItens = 0;
                while(true) {
                    let item = section.looted[lenItens];
                    if (!item) break;

                    let lenNpcItens = 0;
                    while(true) {
                        let itenNpc = npc.buy[lenNpcItens];
                        if (!itenNpc) break;

                        if (itenNpc.name.toUpperCase().replace(/\s/g, '') == item.looted.toUpperCase().replace(/\s/g, '')) {
                            itens.push({ name: itenNpc.name, price: itenNpc.price, total: item.total });
                        }
                        lenNpcItens++;
                    }
                    lenItens++;
                }

                if (itens.length) {
                    delete npc.buy;

                    if (!section.npcs) section.npcs = [];
                    npc.buy = itens;
                    section.npcs.push(npc);
                }

                npcsLen++;
            }
            sectionsLen++;
        }


        // console.log(sections[0].looted);
        return sections;
    }

    async getSectionData() {
        let sections = await this.ReadSection.getSectionData();
        let npcs     = await this.getNpcs();

        return await this.getLocaleSellItem(sections, npcs);
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