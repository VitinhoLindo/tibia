const Cache = require('./Cache');

class Mailer extends Cache {
  constructor() { 
    super(); 
    this.readMailerConfig();
    this.transport = this.Mailer.createTransport(this.smtp);
  }

  readMailerConfig() {
    this.smtp.host = this.process.env.SMTP_HOST;
    this.smtp.port = this.process.env.SMTP_PORT;
    this.smtp.auth.user = this.process.env.SMTP_USER;
    this.smtp.auth.pass = this.process.env.SMTP_PASS;
  }

  async sendMail(arg = this.interface.Mailer.Sender) { 
    if (arg.pathFile) {
      let file = this.readFile(arg.pathFile, { encoding: arg.fileContent });

      if (file.exists && arg.replace) {
        switch (arg.replace.type) {
          case 'html':
            arg.html = this.CustomRegExp.instance({
              regexp: arg.replace.regexp,
              flag: 'g',
              toReplace: arg.replace.value,
              value: file.content
            }).replace();
            break;
          case 'text':
            break;
        }
      }
    }

    let opt = {
      from: arg.from,
      to: this.smtp.auth.user,
      subject: arg.subject,
      text: arg.text,
      html: arg.html
    }

    await this.transport.sendMail(opt);
  }
}

module.exports = Mailer;