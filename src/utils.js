import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import config from './config';
import userReducer from './reducers/userReducer';
import authReducer from './reducers/authReducer';
import rootReducer from './reducers/rootReducer';
import { fetch as fetchUser } from './actions/userActions';

let store = null;

const createAuthStore = () => {
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );
}

class _Utils {
  jwtName = 'AUTHMANAGER-JWT-AUTH';

  constructor(name) {
    if (name)
      this.jwtName = `${this.jwtName}_${name}`;
  }

  getToken = () => {
    return localStorage.getItem(this.jwtName);
  }

  setToken = token => {
    localStorage.setItem(this.jwtName, token);
    return this;
  }

  deleteToken = () => {
    localStorage.removeItem(this.jwtName);
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

  getReducers() {
    return {
      user: userReducer,
      auth: authReducer
    };
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

export default _Utils();