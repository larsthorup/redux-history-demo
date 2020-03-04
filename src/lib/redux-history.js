import queryString from 'query-string';
import * as R from 'ramda';
import * as History from 'history';

export const history = History.createBrowserHistory();

function stringify(state) {
  return {
    hash: queryString.stringify(state.hash || {}),
    pathname: state.pathname,
    search: queryString.stringify(state.search || {}),
    state: null
  };
}

function stringifyProps(props) {
  return stringify({
    hash: props.hash || {},
    pathname: props.pathname,
    search: props.search || {}
  });
}

// Note: for internal use only
const locationChanged = payload => ({
  type: 'locationChanged',
  payload
});
export const historyPush = payload => ({ type: 'historyPush', payload });
export const historyReplace = payload => ({ type: 'historyReplace', payload });

export const initialState = {
  hash: {},
  pathname: '/',
  search: {}
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'locationChanged':
      const location = {
        hash: queryString.parse(action.payload.hash) || {},
        pathname: action.payload.pathname,
        search: queryString.parse(action.payload.search) || {}
      };
      return R.equals(state, location) ? state : location;
    default:
      return state;
  }
}

export const locationMiddleware = store => next => action => {
  const state = store.getState().location;
  const { payload } = action;
  switch (action.type) {
    case 'historyPush':
      history.push(stringifyProps(payload));
      break;
    case 'historyReplace':
      history.replace(stringifyProps(payload));
      break;
    default:
      next(action);
  }
};

export function listen(store) {
  const unlisten = history.listen(location => {
    store.dispatch(locationChanged(location));
  });
  const { location } = history;
  store.dispatch(locationChanged(location)); // Note: initial location
  return { unlisten };
}
