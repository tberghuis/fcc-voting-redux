import {
    REDIRECT,
    REGISTER
} from '../constants/actionTypes';

// import {
//   APP_LOAD,
//   REDIRECT,
//   LOGOUT,
//   ARTICLE_SUBMITTED,
//   SETTINGS_SAVED,
//   LOGIN,
//   REGISTER,
//   DELETE_ARTICLE,
//   ARTICLE_PAGE_UNLOADED,
//   EDITOR_PAGE_UNLOADED,
//   HOME_PAGE_UNLOADED,
//   PROFILE_PAGE_UNLOADED,
//   PROFILE_FAVORITES_PAGE_UNLOADED,
//   SETTINGS_PAGE_UNLOADED,
//   LOGIN_PAGE_UNLOADED,
//   REGISTER_PAGE_UNLOADED
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

        case REGISTER:
            return {
                ...state,
                redirectTo: action.error ? null : '/'
            };

        case REDIRECT:
            return { ...state, redirectTo: null };

        default:
            return state;
    }
};
