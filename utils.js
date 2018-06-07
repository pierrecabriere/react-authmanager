'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _rootReducer = require('./reducers/rootReducer');

var _rootReducer2 = _interopRequireDefault(_rootReducer);

var _userActions = require('./actions/userActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JWT_NAME = 'AUTHMANAGER-JWT-AUTH';

var store = null;

var createAuthStore = function createAuthStore() {
  var store = (0, _redux.createStore)(_rootReducer2.default, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), (0, _redux.applyMiddleware)(_reduxThunk2.default));

  return store;
};

var _Utils = function () {
  function _Utils() {
    var _this = this;

    _classCallCheck(this, _Utils);

    this.getToken = function () {
      return localStorage.getItem(JWT_NAME);
    };

    this.setToken = function (token) {
      localStorage.setItem(JWT_NAME, token);
      return _this;
    };

    this.deleteToken = function () {
      localStorage.removeItem(JWT_NAME);
      return _this;
    };

    this.createGuard = function (name, guard) {
      _config2.default.guards[name] = guard;
      return _this;
    };
  }

  _createClass(_Utils, [{
    key: 'getStore',
    value: function getStore() {
      if (!store) {
        store = createAuthStore();
        this.fetchUser();
      }

      return store;
    }
  }, {
    key: 'fetchUser',
    value: function fetchUser() {
      this.getStore().dispatch((0, _userActions.fetch)());
      return this;
    }
  }]);

  return _Utils;
}();

exports.default = new _Utils();