'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetch = exports.fetchSuccess = exports.types = undefined;

var _userService = require('../services/userService');

var _userService2 = _interopRequireDefault(_userService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const types = exports.types = {
  FETCH_SUCCESS: 'USER_FETCH_SUCCESS'
};

const fetchSuccess = exports.fetchSuccess = data => ({
  type: types.FETCH_SUCCESS,
  payload: data
});

const fetch = exports.fetch = () => {
  return async dispatch => {
    try {
      const data = await _userService2.default.fetch();
      dispatch(fetchSuccess(data));
    } catch (e) {
      dispatch(fetchSuccess(false));
    }
  };
};