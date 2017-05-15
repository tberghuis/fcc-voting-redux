import {
    CREATE_POLL,
    GET_POLL
} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_POLL:
        case CREATE_POLL:
            console.log(action);
            // so i want action.payload.poll
            return {
                ...action.payload.poll //, userHasVoted: false
            };
        default:
            return state;
    }

    //return state;
};
