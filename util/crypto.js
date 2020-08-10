const ReadSection = require('./readSection');

class Crypto extends ReadSection {
    secretLen = 100;

    constructor() {
        super();
    }

    getRandom(min,max) {
        let decimalHouse = 10;

        if (min > max) {
            let savedMax = max;
            max = min;
            min = savedMax;
        }

        while (max > decimalHouse) {
            decimalHouse *= 10;
        }

        var randomValue = 0;

        do {
            randomValue = Math.floor(Math.random() * decimalHouse);
        } while (min <= randomValue && randomValue >= max);

        return randomValue;
    }

    getHash(value) {
        let hashable = this.crypto.createHash('sha256');

        hashable.update(value);
        return hashable.digest('hex');
    }

    getSecret() {
        let characters = {
            latter : 'abcdefghijklmnopqrstuvxywz',
            number : '012456789',
            supper : '!@#$%*()[]{}~^º><:;|'
        };
        let len    = 0;
        let secret = '';
        let keys   = ['latter', 'number', 'supper'];

        while (len < this.secretLen) {
            let key   = keys[this.getRandom(0, keys.length)];
            let value = characters[key]; 
            secret += value[this.getRandom(0, value.length)];

            len++;
        }

        return this.getHash(secret);
    }
}

module.exports = Crypto;