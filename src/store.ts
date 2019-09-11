import { combineReducers, createStore } from "redux";
import userReducer from './reducers/userReducer';
import authReducer from './reducers/authReducer';

export default () => createStore(
  combineReducers({
    user: userReducer,
    auth: authReducer
  })
);