import { fetch, fetchError } from './userActions';
import authService from '../services/authService';
import * as types from '../types/authTypes';

export const loginStart = () => ({
  type: types.LOGIN_START
})

export const loginEnd = () => ({
  type: types.LOGIN_END
})

export const logoutStart = () => ({
  type: types.LOGOUT_START
})

export const logoutEnd = () => ({
  type: types.LOGOUT_END
})

export const login = credentials => {
  return async dispatch => {
    dispatch(loginStart());
    await authService.login(credentials);
    dispatch(loginEnd());
    dispatch(fetch());
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch(logoutStart());
    await authService.logout();
    dispatch(logoutEnd());
    dispatch(fetchError());
  }
}