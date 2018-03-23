import authService from '../services/authService';
import userService from '../services/userService';
import { fetchSuccess } from './userActions';

export const login = credentials => {
  return async dispatch => {
    try {
      await authService.login(credentials);
      const data = await userService.fetch();
      dispatch(fetchSuccess(data));
    } catch (e) {
      dispatch(fetchSuccess(false));
    }
  }
}

export const logout = () => {
  return async dispatch => {
    await authService.logout();
    dispatch(fetchSuccess(false));
  }
}