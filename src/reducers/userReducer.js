import * as types from '../types/userTypes';

const initialState = {
  loading: false,
  logged: false
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
      return initialState;
    case types.FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export default userReducer;