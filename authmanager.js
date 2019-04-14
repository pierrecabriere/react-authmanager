'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class _Authmanager {
  constructor(name, config) {
    this.config = new _config2.default(config);
    this.utils = new _utils2.default(name);
  }

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

exports.default = new _Authmanager();