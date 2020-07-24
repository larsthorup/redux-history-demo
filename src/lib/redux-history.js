import queryString from 'query-string';
import * as R from 'ramda';
import * as History from 'history';

// Note: this library is a simple implementation of a Redux-first router
// inspired by this blog post: https://www.freecodecamp.org/news/an-introduction-to-the-redux-first-routing-model-98926ebf53cb/

// Also described in this blog post: https://www.fullstackagile.eu/2020/03/04/routing/

export const history = History.createBrowserHistory();

function stringifyWithPrefix(prefix, hash) {
  const hashString = queryString.stringify(hash);
  return hashString === '' ? '' : prefix + hashString;
}

// In Redux we prefer to work with `hash` and `search` elements as destructured objects,
// instead of the string returned by the raw `history` API
function stringify(state) {
  return {
    hash: stringifyWithPrefix('#', state.hash),
    key: 'default',
    pathname: state.pathname,
    search: stringifyWithPrefix('?', state.search),
    state: null,
  };
}

function stringifyPayload(payload) {
  return stringify({
    hash: payload.hash || {},
    pathname: payload.pathname,
    search: payload.search || {},
  });
}

// Redux action to dispatch in the history listener below. Not for use outside this library
const locationChanged = (payload) => ({
  type: 'locationChanged',
  payload,
});

// Redux actions to update location state
export const historyBack = () => ({ type: 'historyBack' });
export const historyPush = (payload) => ({ type: 'historyPush', payload });
export const historyReplace = (payload) => ({
  type: 'historyReplace',
  payload,
});

export const initialState = {
  hash: {},
  pathname: '/',
  search: {},
};

export function locationReducer(state = initialState, action) {
  // Note: historyPush and historyReplace actions are not handled in the reducer
  // instead they are handled in the middleware below where the URL will be
  // updated through the history API. This update will fire a historyChange action
  // causing the redux state to be updated accordingly
  switch (action.type) {
    case 'locationChanged':
      const location = {
        hash: queryString.parse(action.payload.hash) || {},
        pathname: action.payload.pathname,
        search: queryString.parse(action.payload.search) || {},
      };
      // console.log('locationChanged', location, state);
      return R.equals(state, location) ? state : location;
    default:
      return state;
  }
}

// The middleware execute side effects against the history API for history actions
export const locationMiddleware = (store) => (next) => (action) => {
  const { payload } = action;
  switch (action.type) {
    case 'historyBack':
      history.back();
      break;
    case 'historyPush':
      history.push(stringifyPayload(payload));
      break;
    case 'historyReplace':
      history.replace(stringifyPayload(payload));
      break;
    default:
      next(action);
  }
};

// Note: update redux state with the initial location from the history API
// and attach a listener to convert all URL updates into dispatched historyChange actions
export function listen(store) {
  const unlisten = history.listen(({ location }) => {
    store.dispatch(locationChanged(location));
  });
  const { location } = history;
  store.dispatch(locationChanged(location)); // Note: initial location
  return { unlisten };
}
