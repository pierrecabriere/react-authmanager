'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _flexibleCookies = require('flexible-cookies');

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _rootReducer = require('./reducers/rootReducer');

var _rootReducer2 = _interopRequireDefault(_rootReducer);

var _userActions = require('./actions/userActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Utils {
  constructor() {
    this.getToken = () => {
      return _flexibleCookies.Cookies.get('JWT-AUTH');
    };

    this.setToken = token => {
      _flexibleCookies.Cookies.set('JWT-AUTH', token);
      return true;
    };

    this.deleteToken = () => {
      _flexibleCookies.Cookies.delete('JWT-AUTH');
      return true;
    };

    this.createStore = () => {
      const store = (0, _redux.createStore)(_rootReducer2.default, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), (0, _redux.applyMiddleware)(_reduxThunk2.default));

      // load user
      store.dispatch((0, _userActions.fetch)());

      return store;
    };

    this.createGuard = (name, guard) => {
      _config2.default.guards[name] = guard;
      return guard;
    };
  }

}

exports.default = new Utils();