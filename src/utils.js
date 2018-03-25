import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import config from './config';
import rootReducer from './reducers/rootReducer';
import { fetch as fetchUser } from './actions/userActions';

const JWT_NAME = 'AUTHMANAGER-JWT-AUTH';

// make localStorage compatible for old browsers
if (!window.localStorage) {
  Object.defineProperty(window, "localStorage", new (function () {
    var aKeys = [], oStorage = {};
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
        }
        else {
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
  })());
}

let store = null;

const createAuthStore = () => {
  const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );

  return store;
}

class Utils {
  getToken = () => {
    return localStorage.getItem(JWT_NAME);
  }

  setToken = token => {
    localStorage.setItem(JWT_NAME, token);
    return this;
  }

  deleteToken = () => {
    localStorage.removeItem(JWT_NAME);
    return this;
  }

  getStore() {
    if (!store) {
      store = createAuthStore();
      this.fetchUser();
    }

    return store;
  }

  fetchUser() {
    this.getStore().dispatch(fetchUser());
  }

  createGuard = (name, guard) => {
    config.guards[name] = guard;
    return this;
  }
}

export default new Utils();