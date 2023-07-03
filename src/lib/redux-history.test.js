import * as Redux from 'redux';
import * as History from 'history';

import * as ReduxHistory from './redux-history';
import { expect, test } from 'vitest';

test('redux-history', async () => {
  // given initial setup
  const rootReducer = Redux.combineReducers({
    location: ReduxHistory.locationReducer,
  });
  const middleware = Redux.compose(
    Redux.applyMiddleware(ReduxHistory.locationMiddleware)
  );
  const store = Redux.createStore(rootReducer, middleware);
  ReduxHistory.listen(store);

  // then initial route is '/'
  expect(ReduxHistory.history.location.pathname).toEqual('/');
  expect(store.getState().location.pathname).toEqual('/');

  // when dispatching historyPush action
  store.dispatch(ReduxHistory.historyPush({ pathname: '/signin' }));

  // then route is '/signin'
  expect(ReduxHistory.history.location.pathname).toEqual('/signin');
  expect(store.getState().location.pathname).toEqual('/signin');

  // when dispatching historyPush action
  store.dispatch(ReduxHistory.historyReplace({ pathname: '/' }));

  // then route is '/'
  expect(ReduxHistory.history.location.pathname).toEqual('/');
  expect(store.getState().location.pathname).toEqual('/');
});
