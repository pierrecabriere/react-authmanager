import * as types from '../types/userTypes';

export const reset = () => ({
  type: types.RESET
});

export const fetchStart = () => ({
  type: types.FETCH_START
});

export const fetchEnd = () => ({
  type: types.FETCH_END
});

export const fetchError = () => ({
  type: types.FETCH_ERROR
});

export const fetchSuccess = data => ({
  type: types.FETCH_SUCCESS,
  payload: data
});
