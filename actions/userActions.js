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

const fetchStart = exports.fetchStart = () => ({
  type: types.FETCH_START
});

const fetchEnd = exports.fetchEnd = () => ({
  type: types.FETCH_END
});

const fetchError = exports.fetchError = () => ({
  type: types.FETCH_ERROR
});

const fetchSuccess = exports.fetchSuccess = data => ({
  type: types.FETCH_SUCCESS,
  payload: data
});

const fetch = exports.fetch = () => {
  return (() => {
    var _ref = _asyncToGenerator(function* (dispatch) {
      dispatch(fetchStart());
      try {
        const data = yield _userService2.default.fetch();
        data.logged = yield _config2.default.isUserLogged(data);
        dispatch(fetchSuccess(data));
      } catch (e) {
        dispatch(fetchError());
      }
      dispatch(fetchEnd());
    });

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  })();
};