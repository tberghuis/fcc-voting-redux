import {
    GET_POLL_MY
} from '../constants/actionTypes';

const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_POLL_MY:
            // console.log(action);
            return action.payload.polls;
        default:
            return state;
    }
};
