import {
  LOGIN,
  REGISTER,
  ASYNC_START,
  UPDATE_FIELD_AUTH
} from '../constants/actionTypes';

const defaultState = {
  username: '',
  email: '',
  password: ''
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
    case REGISTER:
      return {
        ...state,
        inProgress: false,
        errors: action.error ? action.payload.errors : null
      };
    case ASYNC_START:
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        return { ...state, inProgress: true };
      }
      break;
    case UPDATE_FIELD_AUTH:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }

  return state;
};
