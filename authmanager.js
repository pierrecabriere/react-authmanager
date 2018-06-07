'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Authmanager = function _Authmanager() {
  _classCallCheck(this, _Authmanager);

  this.config = _config2.default;
  this.utils = _utils2.default;
};

exports.default = new _Authmanager();