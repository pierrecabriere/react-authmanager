'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _rootReducer = require('./reducers/rootReducer');

var _rootReducer2 = _interopRequireDefault(_rootReducer);

var _userActions = require('./actions/userActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const JWT_NAME = 'AUTHMANAGER-JWT-AUTH';

// make localStorage compatible for old browsers
if (!window.localStorage) {
  Object.defineProperty(window, "localStorage", new function () {
    var aKeys = [],
        oStorage = {};
    Object.defineProperty(oStorage, "getItem", {
      value: function (sKey) {
        return sKey ? this[sKey] : null;
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "key", {
      value: function (nKeyId) {
        return aKeys[nKeyId];
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "setItem", {
      value: function (sKey, sValue) {
        if (!sKey) {
          return;
        }
        document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "length", {
      get: function () {
        return aKeys.length;
      },
      configurable: false,
      enumerable: false
    });
    Object.defineProperty(oStorage, "removeItem", {
      value: function (sKey) {
        if (!sKey) {
          return;
        }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      },
      writable: false,
      configurable: false,
      enumerable: false
    });
    this.get = function () {
      var iThisIndx;
      for (var sKey in oStorage) {
        iThisIndx = aKeys.indexOf(sKey);
        if (iThisIndx === -1) {
          oStorage.setItem(sKey, oStorage[sKey]);
        } else {
          aKeys.splice(iThisIndx, 1);
        }
        delete oStorage[sKey];
      }
      for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) {
        oStorage.removeItem(aKeys[0]);
      }
      for (var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/); nIdx < aCouples.length; nIdx++) {
        aCouple = aCouples[nIdx].split(/\s*=\s*/);
        if (aCouple.length > 1) {
          oStorage[iKey = unescape(aCouple[0])] = unescape(aCouple[1]);
          aKeys.push(iKey);
        }
      }
      return oStorage;
    };
    this.configurable = false;
    this.enumerable = true;
  }());
}

let store = null;

const createAuthStore = () => {
  const store = (0, _redux.createStore)(_rootReducer2.default, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), (0, _redux.applyMiddleware)(_reduxThunk2.default));

  return store;
};

class Utils {
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

    this.createGuard = (name, guard) => {
      _config2.default.guards[name] = guard;
      return this;
    };
  }

  getStore() {
    if (!store) {
      store = createAuthStore();
      this.fetchUser();
    }

    return store;
  }

  fetchUser() {
    this.getStore().dispatch((0, _userActions.fetch)());
  }

}

exports.default = new Utils();