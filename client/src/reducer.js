import { combineReducers } from 'redux';

import auth from './reducers/auth';
import common from './reducers/common';


export default combineReducers({

  auth,
  common
});
