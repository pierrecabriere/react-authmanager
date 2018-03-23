import { Cookies } from 'flexible-cookies';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'reducers/rootReducer';
import thunk from 'redux-thunk';
import { fetch as fetchUser } from './actions/userActions';
import configureStore from "src/configureStore";

class Utils {
  getToken = () => {
    return Cookies.get('JWT-AUTH');
  }

  setToken = token => {
    Cookies.set('JWT-AUTH', token);
  }

  deleteToken = () => {
    Cookies.delete('JWT-AUTH');
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
}

export default new Utils();