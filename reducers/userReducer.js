'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _userActions = require('../actions/userActions');

const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case _userActions.types.FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

exports.default = userReducer;