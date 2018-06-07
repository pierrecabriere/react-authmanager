'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.fetchSuccess = exports.fetchError = exports.fetchEnd = exports.fetchStart = undefined;

var _userService = require('../services/userService');

var _userService2 = _interopRequireDefault(_userService);

var _userTypes = require('../types/userTypes');

var types = _interopRequireWildcard(_userTypes);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var fetchStart = exports.fetchStart = function fetchStart() {
  return {
    type: types.FETCH_START
  };
};

var fetchEnd = exports.fetchEnd = function fetchEnd() {
  return {
    type: types.FETCH_END
  };
};

var fetchError = exports.fetchError = function fetchError() {
  return {
    type: types.FETCH_ERROR
  };
};

var fetchSuccess = exports.fetchSuccess = function fetchSuccess(data) {
  return {
    type: types.FETCH_SUCCESS,
    payload: data
  };
};

var fetch = exports.fetch = function fetch() {
  return function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(dispatch) {
      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              dispatch(fetchStart());
              _context.prev = 1;
              _context.next = 4;
              return _userService2.default.fetch();

            case 4:
              data = _context.sent;
              _context.next = 7;
              return _config2.default.isUserLogged(data);

            case 7:
              data.logged = _context.sent;

              dispatch(fetchSuccess(data));
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](1);

              dispatch(fetchError());

            case 14:
              dispatch(fetchEnd());

            case 15:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[1, 11]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};