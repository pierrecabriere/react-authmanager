'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AuthService {
  constructor() {
    this.login = async credentials => {
      const token = await _config2.default.getToken(credentials);
      _utils2.default.setToken(token);
      return true;
    };

    this.logout = async () => {
      _utils2.default.deleteToken();
      return true;
    };
  }

}

exports.default = new AuthService();