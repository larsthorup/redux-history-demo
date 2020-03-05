import { useSelector, useDispatch } from 'react-redux';
import { historyReplace, historyPush } from './redux-history';
import { match } from 'path-to-regexp';

export function useNavigate({ replace } = {}) {
  const dispatch = useDispatch();
  return (pathname, hash = {}) => ev => {
    ev.preventDefault();
    const actionCreator = replace ? historyReplace : historyPush;
    dispatch(actionCreator({ hash, pathname }));
  };
}

function findMatchResult(routes, pathname) {
  for (const routePath of Object.keys(routes)) {
    const matchResult = match(routePath)(pathname);
    if (matchResult) {
      return routePath;
    }
  }
}

export function useRoutes(routes) {
  const pathname = useSelector(state => state.location.pathname);
  const routePath = findMatchResult(routes, pathname);
  return routePath ? routes[routePath] : null;
}

export function usePath(routePath) {
  const pathname = useSelector(state => state.location.pathname);
  const matchResult = match(routePath)(pathname);
  return matchResult ? matchResult.params : {};
}
