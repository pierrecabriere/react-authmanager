'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logout = exports.login = exports.logoutEnd = exports.logoutStart = exports.loginEnd = exports.loginStart = undefined;

var _userActions = require('./userActions');

var _authService = require('../services/authService');

var _authService2 = _interopRequireDefault(_authService);

var _authTypes = require('../types/authTypes');

var types = _interopRequireWildcard(_authTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const loginStart = exports.loginStart = () => ({
  type: types.LOGIN_START
});

const loginEnd = exports.loginEnd = () => ({
  type: types.LOGIN_END
});

const logoutStart = exports.logoutStart = () => ({
  type: types.LOGOUT_START
});

const logoutEnd = exports.logoutEnd = () => ({
  type: types.LOGOUT_END
});

const login = exports.login = credentials => {
  return async dispatch => {
    dispatch(loginStart());
    await _authService2.default.login(credentials);
    dispatch(loginEnd());
    dispatch((0, _userActions.fetch)());
  };
};

const logout = exports.logout = () => {
  return async dispatch => {
    dispatch(logoutStart());
    await _authService2.default.logout();
    dispatch(logoutEnd());
    dispatch((0, _userActions.fetchError)());
  };
};