import * as types from '../types/authTypes';

const initialState = {
  loading: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_START:
    case types.LOGOUT_START:
      return {
        ...state,
        loading: true
      };
    case types.LOGIN_END:
    case types.LOGOUT_END:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

export default userReducer;