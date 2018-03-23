import userService from '../services/userService';

export const types = {
  FETCH_SUCCESS: 'USER_FETCH_SUCCESS'
};

export const fetchSuccess = data => ({
  type: types.FETCH_SUCCESS,
  payload: data
})

export const fetch = () => {
  return async dispatch => {
    try {
      const data = await userService.fetch();
      dispatch(fetchSuccess(data));
    } catch (e) {
      dispatch(fetchSuccess(false));
    }
  }
}
