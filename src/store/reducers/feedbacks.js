import { GET_ALL_FEEDBACKS, DELETE_FEEDBACK, UPDATE_FEEDBACK, CREATE_FEEDBACK } from '../actionTypes';

export default (state = null, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_ALL_FEEDBACKS:
      return payload;
    case DELETE_FEEDBACK:
      return state.filter(item => item._id !== payload._id);
    case UPDATE_FEEDBACK:
      return state.map(item => {
        if (item._id === payload._id) {
          return { ...item, ...payload };
        }
        return item;
      });
    case CREATE_FEEDBACK:
      return state ? [...state, payload] : [payload]
    default:
      return state;
  }
};
