import { GET_ALL_SITE_INFO, UPDATE_SITE_INFO } from "../actionTypes";

export default (state = null, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_ALL_SITE_INFO:
      return payload;
    case UPDATE_SITE_INFO:
      return state.map((item) => {
        if (item._id === payload._id) {
          return { ...item, ...payload };
        }
        return item;
      });
    default:
      return state;
  }
};
