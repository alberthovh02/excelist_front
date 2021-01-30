import {
  GET_ALL_SPONSOR,
  DELETE_SPONSOR,
  CREATE_SPONSOR,
} from "../actionTypes";

export default (state = null, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_ALL_SPONSOR:
      return payload;
    case DELETE_SPONSOR:
      return state.filter((item) => item._id !== payload._id);
    case CREATE_SPONSOR:
      return state ? [...state, payload] : [payload];
    default:
      return state;
  }
};
