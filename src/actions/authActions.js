import authService from '../services/authService';
import { fetch, fetchError } from './userActions';

export const login = credentials => {
  return async dispatch => {
    await authService.login(credentials);
    dispatch(fetch());
  }
}

export const logout = () => {
  return async dispatch => {
    await authService.logout();
    dispatch(fetchError());
  }
}