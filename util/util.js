const Repository = require('./repository');

class Util extends Repository {
    constructor() {
        super();
    }

    getColor(color) {
        let colorObj = {
            reset: '\x1b[0m',
            bright: '\x1b[1m',
            dim: '\x1b[2m',
            underscore: '\x1b[4m',
            blink: '\x1b[5m',
            reverse: '\x1b[7m',
            hidden: '\x1b[8m',
            black: '\x1b[30m',
            red: '\x1b[31m',
            green: '\x1b[32m',
            yellow: '\x1b[33m',
            blue: '\x1b[34m',
            magenta: '\x1b[35m',
            cyan: '\x1b[36m',
            white: '\x1b[37m',
            bgblack: '\x1b[40m',
            bgred: '\x1b[41m',
            bggreen: '\x1b[42m',
            bgyellow: '\x1b[43m',
            bgblue: '\x1b[44m',
            bgmagenta: '\x1b[45m',
            bgcyan: '\x1b[46m',
            bgwhite: '\x1b[47m'
        };

        if (!color)           color = 'white';
        if (!colorObj[color]) color = 'white';

        return colorObj[color];
    }

    getIntergerInString(value = '') {
        let _controller = { finalize: false, len: 0, data: [], value: '' };
    
        while(true) {
          while(true) {
    
            if (!value[_controller.len])           { _controller.finalize = true; break; }
            if (/\d/.test(value[_controller.len])) { _controller.value += value[_controller.len]; _controller.len++; }
            else                                   { _controller.len++; break; }
          }
    
          if (_controller.value)    { _controller.data.push(_controller.value); _controller.value = ''; }
          if (_controller.finalize) { break; }
        }
    
        return _controller.data;
    }
}

module.exports = Util;