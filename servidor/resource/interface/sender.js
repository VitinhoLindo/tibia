class Sender {
  from        = '';
  to          = [] || '';
  subject     = '';
  attachments = {
    filename    : '',
    contentType : '',
    encoding    : '',
    content     : ''
  };
  text        = '';
  html        = '';
  pathFile    = '';
  fileContent = '';
  replace     = {
    regexp      : '',
    value       : '',
    type        : ''
  }

  constructor() {}
}

module.exports = new Sender;