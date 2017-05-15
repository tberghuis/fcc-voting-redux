import { combineReducers } from 'redux';

import auth from './auth';
import common from './common';
import currentPoll from './currentPoll';
import allPolls from './allPolls';
import myPolls from './myPolls';

export default combineReducers({
  auth,
  common,
  currentPoll,
  allPolls,
  myPolls
});
