'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.fetchSuccess = exports.fetchError = exports.fetchEnd = exports.fetchStart = undefined;

var _userService = require('../services/userService');

var _userService2 = _interopRequireDefault(_userService);

var _userTypes = require('../types/userTypes');

var types = _interopRequireWildcard(_userTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return async dispatch => {
    dispatch(fetchStart());
    try {
      const data = await _userService2.default.fetch();
      dispatch(fetchSuccess(data));
    } catch (e) {
      dispatch(fetchError());
    }
    dispatch(fetchEnd());
  };
};