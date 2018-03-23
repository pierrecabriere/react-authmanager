import userService from '../services/userService';
import * as types from '../types/userTypes';

export const fetchStart = () => ({
  type: types.FETCH_START
})

export const fetchEnd = () => ({
  type: types.FETCH_END
})

export const fetchError = () => ({
  type: types.FETCH_ERROR
})

export const fetchSuccess = data => ({
  type: types.FETCH_SUCCESS,
  payload: data
})

export const fetch = () => {
  return async dispatch => {
    dispatch(fetchStart());
    try {
      const data = await userService.fetch();
      dispatch(fetchSuccess(data));
    } catch (e) {
      dispatch(fetchError());
    }
    dispatch(fetchEnd());
  }
}
