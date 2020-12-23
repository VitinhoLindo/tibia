const Base = require('./Base');

class ResourceService extends Base {
  resources  = require('../../app/resources');
  loginModel = require('../../app/Login')
  
  constructor(request, response) { super(request, response) }

  async getResourcesLink() {
    let login = null, authentication = [], resources = [], user = null;
    try {
      let login_id = await this.login();
      login        = await this.loginModel.find(login_id);
      user         = await login.user();
    } catch (error) {}

    /**
     * autenticated user
     */
    for(let resource of this.resources) {
      let resourceModel = resource.make(this.request, this.response);

      if (resourceModel.autentication == false) {
        authentication.push(resourceModel);
      }
      else if (!!login == resourceModel.autentication) {
        authentication.push(resourceModel);
      }
    }

    /**
     * user authorizated
     */
    for(let resource of authentication) {
      if (resource.policie.view(user)) {
        resources.push(resource);
      }
    }
    
    return resources;
  }
}

module.exports = ResourceService;