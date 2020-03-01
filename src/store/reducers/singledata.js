import { GET_ALL_SINGLE_DATA, UPDATE_SINGLE_DATA } from '../actionTypes';

export default (state = null, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_ALL_SINGLE_DATA:
      return payload;
    case UPDATE_SINGLE_DATA:
      return state.map(item => {
        if (item._id === payload._id) {
          return { ...item, ...payload };
        }
        return item;
      });
    default:
      return state;
  }
};
