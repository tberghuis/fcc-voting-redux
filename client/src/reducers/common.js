import {
    REDIRECT,
    REGISTER,
    LOGIN,
    LOGOUT,
    APP_LOAD,
    CREATE_POLL,
    POLL_VOTE
} from '../constants/actionTypes';

const defaultState = {
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                // TODO real app would verify token against server
                loggedIn: action.jwt
            };

        case LOGIN:
        case REGISTER:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                loggedIn: action.error ? false : true
            };

        case REDIRECT:
            return { ...state, redirectTo: null };
        case CREATE_POLL:
            return { ...state, redirectTo: '/poll/' + action.payload.poll.id };
        case POLL_VOTE:
            return { ...state, 
                redirectTo: action.error ? null : '/poll/' + action.payload.poll.id + '/result' 
            };
        case LOGOUT:
            return { ...state, redirectTo: '/', loggedIn: false };

        default:
            return state;
    }
};
