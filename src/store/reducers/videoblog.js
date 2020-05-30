import { GET_ALL_VIDEOBLOGS, DELETE_VIDEOBLOG, UPDATE_VIDEOBLOG, CREATE_VIDEOBLOG } from '../actionTypes';

export default (state = null, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_ALL_VIDEOBLOGS:
      return payload;
    case DELETE_VIDEOBLOG:
      return state.filter(item => item._id !== payload._id);
    case UPDATE_VIDEOBLOG:
      return state.map(item => {
        if (item._id === payload._id) {
          return { ...item, ...payload };
        }
        return item;
      });
    case CREATE_VIDEOBLOG:
      return [...state, payload]
    default:
      return state;
  }
};
