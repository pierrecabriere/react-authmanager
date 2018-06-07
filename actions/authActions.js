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

var loginStart = exports.loginStart = function loginStart() {
  return {
    type: types.LOGIN_START
  };
};

var loginEnd = exports.loginEnd = function loginEnd() {
  return {
    type: types.LOGIN_END
  };
};

var logoutStart = exports.logoutStart = function logoutStart() {
  return {
    type: types.LOGOUT_START
  };
};

var logoutEnd = exports.logoutEnd = function logoutEnd() {
  return {
    type: types.LOGOUT_END
  };
};

var login = exports.login = function login(credentials) {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(loginStart());
              _context.next = 3;
              return _authService2.default.login(credentials);

            case 3:
              dispatch(loginEnd());
              dispatch((0, _userActions.fetch)());

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

var logout = exports.logout = function logout() {
  return function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(dispatch) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              dispatch(logoutStart());
              _context2.next = 3;
              return _authService2.default.logout();

            case 3:
              dispatch(logoutEnd());
              dispatch((0, _userActions.fetchError)());

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
};