'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = undefined;

var _authService = require('../services/authService');

var _authService2 = _interopRequireDefault(_authService);

var _userService = require('../services/userService');

var _userService2 = _interopRequireDefault(_userService);

var _userActions = require('./userActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const login = exports.login = credentials => {
  return async dispatch => {
    try {
      await _authService2.default.login(credentials);
      const data = await _userService2.default.fetch();
      dispatch((0, _userActions.fetchSuccess)(data));
    } catch (e) {
      dispatch((0, _userActions.fetchSuccess)(false));
    }
  };
};

const logout = exports.logout = () => {
  return async dispatch => {
    await _authService2.default.logout();
    dispatch((0, _userActions.fetchSuccess)(false));
  };
};