import { GET_ALL_COURSES, DELETE_COURSE, UPDATE_COURSE, CREATE_COURSE } from '../actionTypes';

export default (state = null, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_ALL_COURSES:
      console.log(payload)
      return payload;
    case DELETE_COURSE:
      return state.filter(item => item._id !== payload._id);
    case UPDATE_COURSE:
      return state.map(item => {
        if (item._id === payload._id) {
          return { ...item, ...payload };
        }
        return item;
      });
    case CREATE_COURSE:
      return [...state, payload]
    default:
      return state;
  }
};
