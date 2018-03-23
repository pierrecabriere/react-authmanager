'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flexibleCookies = require('flexible-cookies');

var _redux = require('redux');

var _rootReducer = require('src/reducers/rootReducer');

var _rootReducer2 = _interopRequireDefault(_rootReducer);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _userActions = require('./actions/userActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Utils {
  constructor() {
    this.getToken = () => {
      return _flexibleCookies.Cookies.get('JWT-AUTH');
    };

    this.setToken = token => {
      _flexibleCookies.Cookies.set('JWT-AUTH', token);
    };

    this.deleteToken = () => {
      _flexibleCookies.Cookies.delete('JWT-AUTH');
    };

    this.createStore = () => {
      const store = (0, _redux.createStore)(_rootReducer2.default, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), (0, _redux.applyMiddleware)(_reduxThunk2.default));

      // load user
      store.dispatch((0, _userActions.fetch)());
      return store;
    };
  }

}

exports.default = new Utils();