'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.fetchSuccess = exports.fetchError = exports.fetchEnd = exports.fetchStart = exports.types = undefined;

var _userService = require('../services/userService');

var _userService2 = _interopRequireDefault(_userService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const types = exports.types = {
  FETCH_SUCCESS: 'USER_FETCH_SUCCESS',
  FETCH_START: 'USER_FETCH_START',
  FETCH_END: 'USER_FETCH_END',
  FETCH_ERROR: 'USER_FETCH_ERROR'
};

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