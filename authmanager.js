'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Authmanager {
  constructor() {
    this.config = _config2.default;
    this.utils = _utils2.default;
    this._store = null;
  }

  get store() {
    if (!this._store) this._store = _utils2.default.createStore();

    return this._store;
  }
}

exports.default = new Authmanager();