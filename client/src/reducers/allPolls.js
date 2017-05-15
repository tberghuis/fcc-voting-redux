import {
    GET_POLL_ALL
    // REGISTER,
    // LOGIN,
    // LOGOUT,
    // APP_LOAD,
    // CREATE_POLL,
    // POLL_VOTE
} from '../constants/actionTypes';


const defaultState = [];


export default (state = defaultState, action) => {
    switch (action.type) {
        // case APP_LOAD:
        //     return {
        //         ...state,
        //         // TODO real app would verify token against server
        //         loggedIn: action.jwt
        //     };


        case GET_POLL_ALL:
            console.log(action);
            return action.payload.polls;
        default:
            return state;
    }
};
