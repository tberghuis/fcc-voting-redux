import {
    CREATE_POLL,
    GET_POLL,
    POLL_VOTE
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_POLL:
        case CREATE_POLL:
        case POLL_VOTE:
            // console.log(action);
            return {
                ...action.payload.poll //, userHasVoted: false
            };
        default:
            return state;
    }

    //return state;
};
