const Crypto = require('../util/crypto');

class Config extends Crypto {
    config = null;

    constructor() {
        super();
    }

    async setConfig() {
        this.setPlataformSetings();
        try {
            this.config = await this.fs.readFileSync(`${this.dirname}${this.repositorys.config.dir}`, { encoding: 'utf-8' });
            this.config = JSON.parse(this.config);
            if (!this.config.secret) throw "";
        } catch (error) {
            this.config        = { port: 3000 };
            this.config.secret = this.getSecret();
            await this.fs.writeFileSync(`${this.dirname}${this.repositorys.config.dir}`, JSON.stringify(this.config), { encoding: 'utf-8' });
        }
    }
}

module.exports = Config;