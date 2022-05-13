import { combineReducers } from 'redux';

import userReducer from './user';
import optionsReducer from './options';

const rootReducer = combineReducers({
  options: optionsReducer,
  user: userReducer,
});

export default rootReducer;
