import userService from '../services/userService';

export const types = {
  FETCH_SUCCESS: 'USER_FETCH_SUCCESS',
  FETCH_START: 'USER_FETCH_START',
  FETCH_END: 'USER_FETCH_END',
  FETCH_ERROR: 'USER_FETCH_ERROR'
};

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
