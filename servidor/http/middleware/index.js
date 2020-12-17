const express = require('express');

class Middlaware {
  options = {
    maxRequest: 20,
    interval: 60000,
    cache: {}
  }
  defaultRequestHeader = [
    { header: 'authentication', attribute: 'token' }, 
    { header: 'language', attribute: 'lang', default: 'serverLang' }
  ];
  defaultResponseHeader = {
    'Server': 'Nodejs'
  }
  routeRules = {}
  app = require('../../http')()

  constructor(app) { 
    this.app = app;
  }

  currentTime(date = new Date()) {
    return date.getTime();
  }

  default(request = express.request, response = express.response, next) {
    request.getApp = () => {
      return this.app;
    }
    return;
  }

  readHeaders(request = express.request, response = express.response, next) {
    this.default(request, response, next);

    for(let optionHeader of this.defaultRequestHeader) {
      let value = request.headers[optionHeader.header] || null;
      request[optionHeader.attribute] = value;
      if (!value && optionHeader.default)
        request[optionHeader.attribute] = this.app[optionHeader.default];
    }
  }

  serverError() {
    return {
      code: 500,
      message: 'Server Error',
      currentTime: this.currentTime(),
      result: {},
      status: 'error'
    }
  }

  setDefaultResponseHeader(value = {}) {
    this.defaultResponseHeader = Object.assign(this.defaultResponseHeader, value);
    return this;
  }

  openToRequest(remoteAddress = '') {
    if (!remoteAddress) return false;

    return this.options.cache[remoteAddress] == this.options.maxRequest ? false : true;
  }

  newRequest(remoteAddress = '') {
    if (!remoteAddress) return;

    let count = this.options.cache[remoteAddress] || 0;
    count++;
    this.options.cache[remoteAddress] = count;
  }

  clearCache() {
    this.options.cache = {};
  }

  getUrl(url = '/') {
    url = url.search(/\?/g) >= 0 ? url.split(/\?/g)[0] : url
    return url.toLowerCase();
  }

  getMethod(method = 'GET') {
    return method.toUpperCase();
  }

  addRule(url, method, rule) {
    url = this.getUrl(url);
    method = this.getMethod(method);

    if (!this.routeRules[url]) {
      this.routeRules[url] = { functions: [] };
    }
    if (!this.routeRules[url][method]) {
      this.routeRules[url][method] = [];
    }

    this.routeRules[url][method].push(rule);
  }

  addMiddlaware(url, method, func) {
    url = this.getUrl(url);
    method = this.getMethod(method);
    if (!this.routeRules[url]) {
      this.routeRules[url] = { functions: [] };
    }
    this.routeRules[url].functions.push({ method: method, call: func });
  }

  getSecondUsingMinute(time) {
    time = parseInt(time) || 1;
    return time * 60;
  }

  getMillisecondsUsingSecond(time) {
    time = parseFloat(time) || 1;
    return time * 1000;
  }

  setMaxRequests(value) {
    this.options.maxRequest = parseInt(value) || 20;
    return this;
  }

  setTimeListenUsingMinute(time = 1) {
    time = this.getSecondUsingMinute(time);
    time = this.getMillisecondsUsingSecond(time);

    this.options.interval = time;
    return this;
  }

  listen() {
    setInterval(() => {
      this.clearCache();
    }, this.options.interval);
    return this;
  }

  validate(request = express.request, response = express.response, next) {
    try {
      // read default langs, class attribute defaultRequestHeader
      this.readHeaders(request, response, next);

      // if exists query split and return url else return url
      let url = this.getUrl(request.url);

      // request method
      let method = this.getMethod(request.method);

      for(let key in this.defaultResponseHeader) response.setHeader(key, this.defaultResponseHeader[key]);

      if (!this.openToRequest(request.socket.remoteAddress)) {
        response.status(429);
        return response.end();
      }
      this.newRequest(request.socket.remoteAddress);

      let rule = this.routeRules[url];
      if (!rule) return next();

      if (rule[method]) {
        
      }

      if (rule.functions) {
        for (let _func of rule.functions) {
          if (_func.method = method) {
            _func.call(request,response, next);
          }
        }
      }
      next();
    } catch (error) {
      response.status(500);
      return response.end();
    }
  }

  static get(app) {
    return new Middlaware(app);
  }
}

module.exports = Middlaware;