'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _userReducer = require('./reducers/userReducer');

var _userReducer2 = _interopRequireDefault(_userReducer);

var _authReducer = require('./reducers/authReducer');

var _authReducer2 = _interopRequireDefault(_authReducer);

var _rootReducer = require('./reducers/rootReducer');

var _rootReducer2 = _interopRequireDefault(_rootReducer);

var _userActions = require('./actions/userActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const JWT_NAME = 'AUTHMANAGER-JWT-AUTH';

let store = null;

const createAuthStore = () => {
  return (0, _redux.createStore)(_rootReducer2.default, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), (0, _redux.applyMiddleware)(_reduxThunk2.default));
};

class _Utils {
  constructor() {
    this.getToken = () => {
      return localStorage.getItem(JWT_NAME);
    };

    this.setToken = token => {
      localStorage.setItem(JWT_NAME, token);
      return this;
    };

    this.deleteToken = () => {
      localStorage.removeItem(JWT_NAME);
      return this;
    };

    this.setStore = newStore => {
      store = newStore;
    };

    this.createGuard = (name, guard) => {
      _config2.default.guards[name] = guard;
      return this;
    };
  }

  getStore() {
    if (!store) {
      this.setStore(createAuthStore());
      this.fetchUser();
    }

    return store;
  }

  getReducers() {
    return {
      user: _userReducer2.default,
      auth: _authReducer2.default
    };
  }

  getReducer() {
    return _rootReducer2.default;
  }

  fetchUser() {
    this.getStore().dispatch((0, _userActions.fetch)());
    return this;
  }

}

exports.default = new _Utils();