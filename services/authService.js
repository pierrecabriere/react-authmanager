'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class AuthService {
  constructor() {
    this.login = (() => {
      var _ref = _asyncToGenerator(function* (credentials) {
        const token = yield _config2.default.getToken(credentials);
        _utils2.default.setToken(token);
        return true;
      });

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    })();

    this.logout = _asyncToGenerator(function* () {
      _utils2.default.deleteToken();
      return true;
    });
  }

}

exports.default = new AuthService();