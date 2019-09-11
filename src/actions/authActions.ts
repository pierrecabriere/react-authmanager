import * as types from '../types/authTypes';

export const loginStart = () => ({
  type: types.LOGIN_START
});

export const loginEnd = () => ({
  type: types.LOGIN_END
});

export const logoutStart = () => ({
  type: types.LOGOUT_START
});

export const logoutEnd = () => ({
  type: types.LOGOUT_END
});