const ResourceService = require('../service/ResourceService');

class ResourceController extends ResourceService {
  constructor(request, response) { super(request, response) }

  static using(request, response) {
    return new ResourceController(request, response);
  }

  async option() {
    return this.defaultResponseJSON();
  }

  async get() {
    return this.defaultResponseJSON({ result: this.getResourcesLink() });
  }

  async post() {
    return this.defaultResponseJSON();
  }

  async put() {
    return this.defaultResponseJSON();
  }

  async delete() {
    return this.defaultResponseJSON();
  }

}

module.exports = ResourceController;