const process = require('process');
const fs      = require('fs');

class Client {
  mysql   = require('mysql2');

  constructor() {}

  getSSL() {
    if (!process.env.MYSQL_SSL_CA || !process.env.MYSQL_SSL_CERT || !process.env.MYSQL_SSL_KEY) return null;

    return {
      ca: fs.readFileSync(`.${process.env.MYSQL_SSL_CA}`),
      cert: fs.readFileSync(`.${process.env.MYSQL_SSL_CERT}`),
      key: fs.readFileSync(`.${process.env.MYSQL_SSL_KEY}`)
    }
  }

  getConfig() {
    let ssl = this.getSSL();
    
    let config = {
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASS || '',
      database: process.env.MYSQL_DB || '',
      connectTimeout: parseInt(process.env.MYSQL_TIMEOUT) || 8000
    };
    
    if (ssl) config.ssl = ssl;
    return config;
  }

  createConnection() {
    return this.mysql.createConnection(this.getConfig());
  }

  connect() {
    this.client = this.createConnection();

    return new Promise((resolve, reject) => {
      this.client.connect((error) => {
        if (error) {
          delete this.client;
          return reject(error);
        }

        return resolve(true);
      });
    });
  }

  disconnect() {
    return new Promise((resolve, reject) => {
      if (!this.client) return resolve(true);

      this.client.end((error) => {
        if (error) return reject(error);
        delete this.client;
        return resolve(true);
      });
    });
  }

  async executeQuery(sql = '') {
    if (!this.client) await this.connect();

    return new Promise((resolve, reject) => {
      this.client.execute({
        sql: sql
      }, async (err, result) => {
        await this.disconnect();

        if (err) return reject(err);
        return resolve(result);
      });
    });
  }
}

module.exports = Client;