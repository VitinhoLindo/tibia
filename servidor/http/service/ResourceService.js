const Base = require('./Base');

class ResourceService extends Base {
  resources = require('../../app/resources');
  
  constructor(request, response) { super(request, response) }

  async getResourcesLink() {
    let resources = [];
    for(let resource of this.resources) {
      let _resource = resource.make(this.request, this.response);

      let auth = await _resource.auth();
      if (auth == _resource.autentication) 
        resources.push(_resource.getPage());
    }
    return resources;
  }
}

module.exports = ResourceService;