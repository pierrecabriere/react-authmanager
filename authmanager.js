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
  get config() {
    return _config2.default;
  }

  get utils() {
    return _utils2.default;
  }
}

exports.default = new _Authmanager();