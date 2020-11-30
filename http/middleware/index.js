const express = require('express');

class Middlaware {
  options = {
    maxRequest: 20,
    interval: 60000,
    cache: {}
  }
  defaultResponseHeader = {
    'Server': 'Nodejs'
  }
  routeRules = {}

  constructor() { }

  currentTime(date = new Date()) {
    return date.getTime();
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
  }

  setTimeListenUsingMinute(time = 1) {
    time = this.getSecondUsingMinute(time);
    time = this.getMillisecondsUsingSecond(time);

    this.options.interval = time;
  }

  listen() {
    setInterval(() => {
      this.clearCache();
    }, this.options.interval);
  }

  validate(request = express.request, response = express.response, next) {
    try {
      let url = this.getUrl(request.url.search(/\?/g) >= 0 ? request.url.split(/\?/g)[0] : request.url);
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

  static get() {
    return new Middlaware();
  }
}

module.exports = Middlaware;