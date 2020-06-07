import { GET_ALL_COMMENTS, DELETE_COMMENT, CREATE_COMMENT } from '../actionTypes';

export default (state = null, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_ALL_COMMENTS:
      return payload;
    case DELETE_COMMENT:
      return state.filter(item => item._id !== payload._id);
    case CREATE_COMMENT:
      return state ? [...state, payload] : [payload]
    default:
      return state;
  }
};
