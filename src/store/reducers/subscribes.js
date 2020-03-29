import { GET_SUBSCRIBERS, DELETE_SUBSCRIBER, CREATE_SUBSCRIBER } from '../actionTypes';

export default (state = null, action) => {
  const payload = action.payload;
  console.log('payload', payload);
  switch (action.type) {
    case GET_SUBSCRIBERS:
      return payload;
    case DELETE_SUBSCRIBER:
      return state.filter(item => item._id !== payload);
    case CREATE_SUBSCRIBER:
    console.log('init')
      return [...state, payload]
    default:
      return state;
  }
};
