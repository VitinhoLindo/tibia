const Event = require('../util/Event');
const Path = require('../util/Path');

class Variables extends Event {
  // paths of project
  path = Path;

  constructor() { super(); }
}

module.exports = Variables;