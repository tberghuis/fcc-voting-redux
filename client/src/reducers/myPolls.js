import {
    GET_POLL_MY,
    POLL_DELETE
} from '../constants/actionTypes';

// state contains array of polls = [{_id,title}, ...]
const defaultState = [];

export default (state = defaultState, action) => {
    switch (action.type) {
        case POLL_DELETE:
            return state.filter((poll)=>{
                return poll._id !== action.id;
            });
        case GET_POLL_MY:
            return action.payload.polls;
        default:
            return state;
    }
};
