const FileService = require('../service/FileService');

class FileController extends FileService {
  constructor(request, response) { super(request, response) }

  static using(request, response) {
    return new FileController(request, response);
  }

  async option() {
    return this.defaultResponseJSON();
  }

  async get() {
    return this.defaultResponseJSON({ result: { size: this.app.getRequestFileLength() }});
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

module.exports = FileController;