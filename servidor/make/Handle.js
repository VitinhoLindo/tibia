const Dir = require('./Dirs')

class Handle extends Dir {
  constructor() { super(); }

  /**
   * @param {*} cmd command default --set
   * @param {*} value argument default ''
   * 
   * utilitie create env and env-example
   */
  async set(cmd = '--set', value = '') {
    if (!value) throw `invalid value to command ${cmd}`;

    switch (value) {
      case 'env': return await this.setEnv();
      default: throw `invalid value to command ${cmd}`;
    }
  }

  /**
   * create env and env-example
   */
  async setEnv() {
    // generate key is password encrypt, iv is binary vector to encrypt
    // generate secret is JWT encrypt key and iv to JWT vector to encrypt
    let cmd          = '--set', 
        serverSecret = this.randomString(200), 
        jwtSecret    = this.randomString(200), 
        serverKey    = this.getIv(), 
        jwtKey       = this.getIv();

    serverSecret = this.hash(serverSecret);
    serverKey    = this.toHex(serverKey);
    jwtSecret    = this.hash(jwtSecret);
    jwtKey       = this.toHex(jwtKey);

    let env = this.paths[cmd]['env-example'].content
      .replace(/@SECRET@/g   , serverSecret)
      .replace(/@KEY@/g      , serverKey)
      .replace(/@JWTSECRET@/g, jwtSecret)
      .replace(/@JWTKEY@/g   , jwtKey);
    let example = this.paths[cmd]['env-example'].content
      .replace(/@SECRET@/g   , '')
      .replace(/@KEY@/g      , '')
      .replace(/@JWTSECRET@/g, '')
      .replace(/@JWTKEY@/g   , '');

    await Promise.all([
      this.fs.writeFileSync(
        this.getDir(
          this.paths[cmd]['env-example'].path
        ),
        example,
        { encoding: 'utf-8' }
      ),
      this.fs.writeFileSync(
        this.getDir(
          this.paths[cmd]['env'].path
        ),
        env,
        { encoding: 'utf-8' }
      )
    ]);
  }

  /**
   * @param {*} cmd default value  --model-sql
   * @param {*} value default value ''
   * 
   * create model sql
   */
  async modelSql(cmd = '--model-sql', value = '') {
    if (!value) throw `invalid value to command ${cmd}`;

    let name  = this.getName(value);
    let table = value.toLowerCase();

    await this.fs.writeFileSync(
      this.getDir(
        this.paths[cmd].path.replace(/@model@/g, name)
      ),
      this.paths[cmd].content
        .replace(/@model@/g, name)
        .replace(/@table@/g, table),
      { encoding: 'utf-8' }
    )
  }

  /**
   * @param {*} cmd default --resource
   * @param {*} value default ''
   * 
   * create resource
   */
  async resource(cmd = '--resource', value = '') {
    if (!value) throw `invalid value to command ${cmd}`;
    let resourceName = this.getResourceName(value);

    await this.fs.writeFileSync(
      this.getDir(
        this.paths[cmd].path
          .replace(/@resourcename@/g, resourceName)
      ),
      this.paths[cmd].content
        .replace(/@resourcename@/g, resourceName),
      { encoding: 'utf-8' }
    )
  }

  /**
   * @param {*} cmd 
   * @param {*} value 
   * 
   * create resource sql
   */
  async resourceSql(cmd = '--resource-sql', value = '') {
    if (!value) throw `invalid value to command ${cmd}`;
    await this.modelSql('--model-sql', value);

    let modelName    = this.getResourceName(value),
        resourceName = this.getResourceName(value),
        model        = this.getName(value);

    await this.fs.writeFileSync(
      this.getDir(
        this.paths[cmd].path
          .replace(/@resourcename@/g, resourceName)
      ),
      this.paths[cmd].content
        .replace(/@model@/g, model)
        .replace(/@modelname@/g, modelName)
        .replace(/@resourcename@/g, resourceName),
      { encoding: 'utf-8' }
    )
  }

  /**
   * @param {*} cmd 
   * @param {*} value 
   * 
   * create hash
   */
  async hashable(cmd = '--hash', value = '') {
    if (!value) throw `invalid value to command ${cmd}`;

    console.log(this.hash(value));
  }

  /**
   * @param {*} cmd 
   * @param {*} value 
   * 
   * create encrypt
   */
  async encryptable(cmd = '--encrypt', value = '') {
    if (!value) throw `invalid value to command ${cmd}`;
    
    console.log(this.encrypt(value));
  }

  /**
   * @param {*} cmd 
   * @param {*} value 
   * 
   * create decrypt
   */
  async decryptable(cmd = '--decrypt', value = '') {
    if (!value) throw `invalid value to command ${cmd}`;

    console.log(this.decrypt(value));
  }

  /**
   * @param {*} cmd 
   * @param {*} value 
   * 
   * create controller, service, api
   */
  async controller(cmd = '--controller', value = '') {
    if (!value) throw `invalid value to command ${cmd}`;

    let route          = value.toLowerCase(),
        controllerName = this.getControllerName(value),
        serviceName    = this.getServiceName(value)
        apiName        = this.getApiName(value);
        

    await Promise.all([
      // controller
      this.fs.writeFileSync(
        this.getDir(
          this.paths[cmd].controller.path
            .replace(/@controllername@/g, controllerName)
        ),
        this.paths[cmd].controller.content
          .replace(/@servicename@/g, serviceName)
          .replace(/@controllername@/g, controllerName), 
        { encoding: 'utf-8' }
      ),
      // service
      this.fs.writeFileSync(
        this.getDir(
          this.paths[cmd].service.path
            .replace(/@servicename@/g, serviceName)
        ),
        this.paths[cmd].service.content
          .replace(/@servicename@/g, serviceName),
        { encoding: 'utf-8' }
      ),
      // api
      this.fs.writeFileSync(
        this.getDir(
          this.paths[cmd].api.path
            .replace(/@apiname@/g, apiName)
        ),
        this.paths[cmd].api.content
          .replace(/@controllername@/g, controllerName)
          .replace(/@route@/g, route),
        { encoding: 'utf-8' })
    ]);
  }

  /**
   * @param {*} cmd 
   * @param {*} value 
   * 
   * create policie to resource
   */
  async police(cmd = '--police', value = '') {
    if (!value) throw `invalid value to command ${cmd}`;

    let policieName = this.getPoliceName(value);

    await this.fs.writeFileSync(
      this.getDir(
        this.paths[cmd].path.replace(/@policename@/g, policieName)
      ),
      this.paths[cmd].content.replace(/@policename@/g, policieName),
      { encoding: 'utf-8' }
    );
  }

  async handleApp() {

  }
}

module.exports = Handle;