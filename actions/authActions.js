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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

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
  return (() => {
    var _ref = _asyncToGenerator(function* (dispatch) {
      dispatch(loginStart());
      yield _authService2.default.login(credentials);
      dispatch(loginEnd());
      dispatch((0, _userActions.fetch)());
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  })();
};

const logout = exports.logout = () => {
  return (() => {
    var _ref2 = _asyncToGenerator(function* (dispatch) {
      dispatch(logoutStart());
      yield _authService2.default.logout();
      dispatch(logoutEnd());
      dispatch((0, _userActions.fetchError)());
    });

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  })();
};