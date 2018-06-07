'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _authTypes = require('../types/authTypes');

var types = _interopRequireWildcard(_authTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
  loading: false
};

var userReducer = function userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.LOGIN_START:
    case types.LOGOUT_START:
      return _extends({}, state, {
        loading: true
      });
    case types.LOGIN_END:
    case types.LOGOUT_END:
      return _extends({}, state, {
        loading: false
      });
    default:
      return state;
  }
};

exports.default = userReducer;