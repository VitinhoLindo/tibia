const Handle = require('./Handle');

class Validate extends Handle {
  constructor() { super(); }

  validateCommand(cmd) {
    switch (cmd) {
      case '--set':           return { status: true, func: 'set'         };
      case '--hash':          return { status: true, func: 'hashable'    };
      case '--controller':    return { status: true, func: 'controller'  };
      case '--model-sql':     return { status: true, func: 'modelSql'    };
      case '--resource-sql':  return { status: true, func: 'resourceSql' };
      case '--resource':      return { status: true, func: 'resource'    };
      case '--police':        return { status: true, func: 'police'      };
      case '--build':         return { status: true, func: 'handleApp'   };
      case '--encrypt':       return { status: true, func: 'encryptable' };
      case '--decrypt':       return { status: true, func: 'decryptable' };

      default: return { status: false };
    }
  }
}

module.exports = Validate;