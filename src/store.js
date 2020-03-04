import { combineReducers } from 'redux';

import { accountReducer } from './account/accountState';
import { locationReducer } from './lib/redux-history';

export const rootReducer = combineReducers({
  account: accountReducer,
  location: locationReducer
});
