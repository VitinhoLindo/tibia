const Util = require('./util');

class NpcSectionOption {
    dir         = '';
    name        = '';
    image       = '';
    alt         = '';
    information = '';
    itens       = [];
    server      = '';
}

class NpcSection extends Util {
    constructor() {
        super();
    }

    validateItens(itens = [{ name: '', price: '' }]) {
        for (let index in itens) {
            let iten = itens[index];

            if (
                iten.name == undefined ||
                iten.price == undefined
            ) throw 'data structure is not supported';

            if (/[a-zA-ZxXyYzZ\s]+/g.test(iten.name) == false)
                throw `name field in itens does not contain only letters '${iten.name}'`;
            if (/^\d+$/g.test(iten.price) == false)
                throw `price field in itens does not contain only numbers '${iten.price}'`;

            itens[index] = { name: iten.name, price: parseInt(iten.price) };
        }

        return itens;
    }

    extractJSON(data = '') {
        data = data.split(/\n/g)
            .filter((line) => {
                if (line) 
                    if (/\t/g.test(line))
                        return line;        
            }).map((line) => {
                let [name, _price] = line.split(/\t/g);
        
                _price = this.getIntergerInString(_price);
                var price = '';
                _price.forEach(_data => { price += _data; });
                return { name: name.trim(), price: parseInt(price) };
            })

        return data;
    }

    async npcStructure(opt = new NpcSectionOption) {
        if (opt.itens && opt.itens.length) {
            opt.itens = this.validateItens(opt.itens);

            return {
                name: opt.name,
                profile: {
                    data: opt.image,
                    alt: opt.alt
                },
                information: opt.information,
                buy: opt.itens
            }
        } else if(opt.server && opt.server.length) {
            opt.itens = this.extractJSON(opt.server);
            delete opt.server;
            return await this.npcStructure(opt);
        } else throw '';

    }

    async addNewNpc(opt = new NpcSectionOption) {
        let npcData = await this.npcStructure(opt);

        await this.fs.writeFileSync(
            opt.dir.replace(/@name@/g, npcData.name.toLowerCase()),
            JSON.stringify(npcData),
            { encoding: 'utf-8' }
        );
    }

    async getNpcs() {
        let npcsDirFiles = await this.fs.readdirSync(this.npcRepository());
    
        let len = 0;
        while(true) {
            let file = npcsDirFiles[len];
            if (!file) break;
    
            file = await this.fs.readFileSync(`${this.npcRepository()}${file}`, { encoding: 'utf-8' });
            npcsDirFiles[len] = JSON.parse(file);
            len++;
        }
    
        return npcsDirFiles;
    }
}

module.exports = NpcSection;