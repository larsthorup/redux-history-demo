import { useSelector, useDispatch } from 'react-redux';
import { historyReplace, historyPush } from './redux-history';

export function useNavigate({ replace } = {}) {
  const dispatch = useDispatch();
  return (pathname, hash = {}) => ev => {
    ev.preventDefault();
    const actionCreator = replace ? historyReplace : historyPush;
    dispatch(actionCreator({ hash, pathname }));
  };
}

export function useRoutes(routes) {
  const pathname = useSelector(state => state.location.pathname);
  return routes[pathname];
}
