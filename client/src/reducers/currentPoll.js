import {
    CREATE_POLL

} from '../constants/actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        // case LOGIN:
        // case REGISTER:
        //   return {
        //     ...state,
        //     inProgress: false,
        //     errors: action.error ? action.payload.errors : null
        //   };
        // case LOGIN_PAGE_UNLOADED:
        // case REGISTER_PAGE_UNLOADED:
        //   return {};

        case CREATE_POLL:
            console.log(action);
            // so i want action.payload.poll
            return {
                ...action.payload.poll, userHasVoted: false
            };
        default:
            return state;
    }

    //return state;
};
