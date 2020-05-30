import {
    GET_ALL_CERTIFICATES,
    DELETE_CERTIFICATE,
    CREATE_CERTIFICATE,
    UPDATE_CERTIFICATE,
    ADD_CERTIFICATE,
} from '../actionTypes';

export default (state = null, action) => {
    const payload = action.payload;
    console.log("Pay", payload)
    switch (action.type) {
        case GET_ALL_CERTIFICATES:
            return payload;
        case DELETE_CERTIFICATE:
            return state.filter(item => item.userId !== payload.userId);
        case CREATE_CERTIFICATE:
            return [...state, payload]
        case ADD_CERTIFICATE:
            return [...state, ...payload]
        default:
            return state;
    }
};
