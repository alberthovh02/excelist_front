import {
    GET_ALL_CERTIFICATES,
    DELETE_CERTIFICATE,
    CREATE_CERTIFICATE,
    UPDATE_CERTIFICATE,
    ADD_CERTIFICATE,
} from '../actionTypes';

export default (state = null, action) => {
    const payload = action.payload;
    switch (action.type) {
        case GET_ALL_CERTIFICATES:
            return payload;
        case DELETE_CERTIFICATE:
            return state.filter(item => item.userId !== payload.userId);
        case CREATE_CERTIFICATE:
            return state ? [...state, payload] : [payload]
        case ADD_CERTIFICATE:
            return state ? [...state, ...payload] : [...payload];
        case UPDATE_CERTIFICATE:
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
