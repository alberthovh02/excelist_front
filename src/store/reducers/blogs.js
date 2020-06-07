import { GET_ALL_BLOGS, DELETE_BLOG, UPDATE_BLOG, CREATE_BLOG, ADD_BLOGS } from '../actionTypes';

export default (state = null, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_ALL_BLOGS:
      return payload;
    case DELETE_BLOG:
      return state.filter(item => item._id !== payload._id);
    case UPDATE_BLOG:
      return state.map(item => {
        if (item._id === payload._id) {
          return { ...item, ...payload };
        }
        return item;
      });
    case ADD_BLOGS:
      return [...payload.data];
    case CREATE_BLOG:
      return state ? [...state, payload] : [payload]
    default:
      return state;
  }
};
