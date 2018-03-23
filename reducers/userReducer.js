import { types } from '../actions/userActions';

const initialState = null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}

export default userReducer;