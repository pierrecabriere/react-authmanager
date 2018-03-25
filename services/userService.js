'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UserService {
  constructor() {
    this.fetch = async () => await _config2.default.getUser();
  }

}

exports.default = new UserService();