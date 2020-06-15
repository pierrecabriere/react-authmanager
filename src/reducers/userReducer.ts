import * as types from '../types/userTypes';

const initialState = {
  loading: false,
  logged: false,
  user: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_START:
      return {
        ...state,
        loading: true
      };
    case types.FETCH_END:
      return {
        ...state,
        loading: false
      };
    case types.FETCH_ERROR:
    case types.RESET:
      return initialState;
    case types.FETCH_SUCCESS:
      return {
        ...state,
        logged: action.payload.logged,
        user: action.payload.user
      };
    default:
      return state;
  }
}

export default userReducer;