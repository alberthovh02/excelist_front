import {
  GET_ALL_BEST,
  DELETE_BEST,
  UPDATE_BEST,
  CREATE_BEST,
  ADD_BEST,
} from "../actionTypes";

export default (state = null, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_ALL_BEST:
      return payload;
    case DELETE_BEST:
      return state.filter((item) => item._id !== payload._id);
    case UPDATE_BEST:
      return state.map((item) => {
        if (item._id === payload._id) {
          return { ...item, ...payload };
        }
        return item;
      });
    case ADD_BEST:
      return [...payload.data];
    case CREATE_BEST:
      return state ? [...state, payload] : [payload];
    default:
      return state;
  }
};
