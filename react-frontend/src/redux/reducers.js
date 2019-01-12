import { combineReducers } from 'redux';

import home from '../pages/home/duck';
import auth from './auth';

export default combineReducers({
  home,
  auth,
});
