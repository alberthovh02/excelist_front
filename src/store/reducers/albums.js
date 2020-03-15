import { GET_ALL_ALBUMS, DELETE_ALBUM, UPDATE_ALBUM, CREATE_ALBUM } from '../actionTypes';

export default (state = null, action) => {
  const payload = action.payload;
  switch (action.type) {
    case GET_ALL_ALBUMS:
      console.log(payload)
      return payload;
    case DELETE_ALBUM:
      return state.filter(item => item._id !== payload._id);
    case UPDATE_ALBUM:
      return state.map(item => {
        if (item.id === payload[0].id) {
          return { ...item, ...payload[0] };
        }
        return item;
      });
    case CREATE_ALBUM:
      return [...state, payload]
    default:
      return state;
  }
};
