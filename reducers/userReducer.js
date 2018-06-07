'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _userTypes = require('../types/userTypes');

var types = _interopRequireWildcard(_userTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const initialState = {
  loading: false,
  logged: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_START:
      return _extends({}, state, {
        loading: true
      });
    case types.FETCH_END:
      return _extends({}, state, {
        loading: false
      });
    case types.FETCH_ERROR:
      return initialState;
    case types.FETCH_SUCCESS:
      return _extends({}, state, action.payload);
    default:
      return state;
  }
};

exports.default = userReducer;