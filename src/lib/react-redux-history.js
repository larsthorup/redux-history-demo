import { useSelector, useDispatch } from 'react-redux';
import { historyBack, historyPush, historyReplace } from './redux-history';
import { compile, match } from 'path-to-regexp';

export function useNavigate({ replace } = {}) {
  const dispatch = useDispatch();
  return (route, params = {}, hash = {}) => (ev) => {
    ev.preventDefault();
    const pathname = compile(route, { encode: encodeURIComponent })(params);
    const actionCreator = replace ? historyReplace : historyPush;
    dispatch(actionCreator({ hash, pathname, search: {} }));
  };
}

export function useNavigateBack() {
  const dispatch = useDispatch();
  return (ev) => {
    ev.preventDefault();
    dispatch(historyBack());
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
  const pathname = useSelector((state) => state.location.pathname);
  const routePath = findMatchResult(routes, pathname);
  return routePath ? routes[routePath] : null;
}

export function usePath(routePath) {
  const pathname = useSelector((state) => state.location.pathname);
  const matchResult = match(routePath)(pathname);
  return matchResult ? matchResult.params : {};
}
