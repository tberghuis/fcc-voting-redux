import {
    REDIRECT,
    REGISTER,
    LOGIN,
    LOGOUT,
    APP_LOAD,
    CREATE_POLL,
    POLL_VOTE
} from '../constants/actionTypes';

// import {
//   APP_LOAD,
//   REDIRECT,
//   ,
//   ARTICLE_SUBMITTED,
//   SETTINGS_SAVED,
//   ,

//   DELETE_ARTICLE,

//   ,
//   
// } from '../constants/actionTypes';

const defaultState = {

};
// const defaultState = {
//   appName: 'Conduit',
//   token: null,
//   viewChangeCounter: 0
// };

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
            //console.log('action',action);
            // action.payload.poll.id
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
