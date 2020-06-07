import { GET_SUBSCRIBERS, DELETE_SUBSCRIBER, CREATE_SUBSCRIBER } from '../actionTypes';

export default (state = null, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_SUBSCRIBERS:
      return payload;
    case DELETE_SUBSCRIBER:
      return state.filter(item => item._id !== payload);
    case CREATE_SUBSCRIBER:
      return state ? [...state, payload] : [payload]
    default:
      return state;
  }
};
