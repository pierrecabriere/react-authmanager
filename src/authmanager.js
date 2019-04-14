import Config from './config';
import Utils from './utils';

class _Authmanager {
  constructor(name, config) {
    this.config = new Config(config);
    this.utils = new Utils(name);
  };

  get config() {
    return this.config;
  }

  set config(value) {
    return this;
  }

  get utils() {
    return this.utils;
  }

  set utils(value) {
    return this;
  }

  create(name, config) {
    return new _Authmanager(name, config);
  }
}

export default new _Authmanager();