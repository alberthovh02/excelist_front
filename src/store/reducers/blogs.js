import { GET_ALL_BLOGS, DELETE_BLOG, UPDATE_BLOG, CREATE_BLOG } from '../actionTypes';

export default (state = null, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_ALL_BLOGS:
      console.log(payload)
      return payload;
    case DELETE_BLOG:
      return state.filter(item => item._id !== payload._id);
    case UPDATE_BLOG:
      return state.map(item => {
        if (item.id === payload[0].id) {
          return { ...item, ...payload[0] };
        }
        return item;
      });
    case CREATE_BLOG:
      return [...state, payload]
    default:
      return state;
  }
};
