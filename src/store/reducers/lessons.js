import { GET_ALL_LESSONS, DELETE_LESSON, UPDATE_LESSON, CREATE_LESSON } from '../actionTypes';

export default (state = null, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_ALL_LESSONS:
      return payload;
    case DELETE_LESSON:
      return state.filter(item => item._id !== payload);
    case UPDATE_LESSON:
      return state.map(item => {
        if (item._id === payload._id) {
          return { ...item, ...payload };
        }
        return item;
      });
    case CREATE_LESSON:
      return state ? [...state, payload] : [payload]
    default:
      return state;
  }
};
