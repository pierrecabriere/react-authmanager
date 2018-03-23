'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = undefined;

var _authService = require('../services/authService');

var _authService2 = _interopRequireDefault(_authService);

var _userActions = require('./userActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const login = exports.login = credentials => {
  return async dispatch => {
    await _authService2.default.login(credentials);
    dispatch((0, _userActions.fetch)());
  };
};

const logout = exports.logout = () => {
  return async dispatch => {
    await _authService2.default.logout();
    dispatch((0, _userActions.fetchError)());
  };
};