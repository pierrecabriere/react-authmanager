import { Cookies } from 'flexible-cookies';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import config from './config';
import rootReducer from './reducers/rootReducer';
import { fetch as fetchUser } from './actions/userActions';

class Utils {
  getToken = () => {
    return Cookies.get('JWT-AUTH');
  }

  setToken = token => {
    Cookies.set('JWT-AUTH', token);
    return true;
  }

  deleteToken = () => {
    Cookies.delete('JWT-AUTH');
    return true;
  }

  createStore = () => {
    const store = createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(thunk)
    );

    // load user
    store.dispatch(fetchUser());

    return store;
  }

  createGuard = (name, guard) => {
    config.guards[name] = guard;
    return guard;
  }
}

export default new Utils();