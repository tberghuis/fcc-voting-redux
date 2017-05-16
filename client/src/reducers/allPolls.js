import {
    GET_POLL_ALL
} from '../constants/actionTypes';

const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_POLL_ALL:
            return action.payload.polls;
        default:
            return state;
    }
};
