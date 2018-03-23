'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _userActions = require('../actions/userActions');

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initialState = {
  loading: false,
  logged: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case _userActions.types.FETCH_START:
      return _extends({}, state, {
        loading: true
      });
    case _userActions.types.FETCH_END:
      return _extends({}, state, {
        loading: false
      });
    case _userActions.types.FETCH_ERROR:
      return initialState;
    case _userActions.types.FETCH_SUCCESS:
      return _extends({}, state, action.payload, {
        logged: _config2.default.isUserLogged(action.payload)
      });
    default:
      return state;
  }
};

exports.default = userReducer;