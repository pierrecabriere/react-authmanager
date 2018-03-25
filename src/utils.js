import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import config from './config';
import rootReducer from './reducers/rootReducer';
import { fetch as fetchUser } from './actions/userActions';

const JWT_NAME = 'AUTHMANAGER-JWT-AUTH';

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
    return this;
  }

  createGuard = (name, guard) => {
    config.guards[name] = guard;
    return this;
  }
}

export default new Utils();