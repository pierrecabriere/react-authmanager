import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import config from './config';
import rootReducer from './reducers/rootReducer';
import { fetch as fetchUser } from './actions/userActions';

const JWT_NAME = 'AUTHMANAGER-JWT-AUTH';

let store = null;

const createAuthStore = () => {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );
}

class _Utils {
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

  setStore = newStore => {
    store = newStore;
  }

  getStore() {
    if (!store) {
      this.setStore(createAuthStore());
      this.fetchUser();
    }

    return store;
  }

  getReducer() {
    return rootReducer;
  }

  fetchUser() {
    this.getStore().dispatch(fetchUser());
    return this;
  }

  createGuard = (name, guard) => {
    config.guards[name] = guard;
    return this;
  }
}

export default new _Utils();