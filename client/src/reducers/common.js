import {
    REDIRECT,
    REGISTER,
    LOGIN,
    LOGOUT
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

        case LOGIN:
        case REGISTER:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                loggedIn: action.error ? false : true
            };

        case REDIRECT:
            return { ...state, redirectTo: null };
        case LOGOUT:
            return { ...state, redirectTo: '/', loggedIn: false };

        default:
            return state;
    }
};
