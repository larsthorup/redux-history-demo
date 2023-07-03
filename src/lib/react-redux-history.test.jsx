import React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import {
  getNodeText,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';

import * as ReduxHistory from './redux-history';
import * as ReactReduxHistory from './react-redux-history';
import { expect, test } from 'vitest';

test('react-redux-history', async () => {
  // given initial setup
  const rootReducer = Redux.combineReducers({
    location: ReduxHistory.locationReducer,
  });
  const middleware = Redux.compose(
    Redux.applyMiddleware(ReduxHistory.locationMiddleware)
  );
  const store = Redux.createStore(rootReducer, middleware);
  ReduxHistory.listen(store);
  const RoutePaths = {
    Home: '/',
    Profile: '/profile/:id',
    Signin: '/signin',
  };
  const Home = () => {
    const navigate = ReactReduxHistory.useNavigate();
    return (
      <>
        <div>Home</div>
        <button onClick={navigate(RoutePaths.Signin)}>Login</button>
        <button
          onClick={navigate(RoutePaths.Profile, { id: 47 }, { tab: 'all' })}
        >
          Profile
        </button>
      </>
    );
  };
  const Signin = () => {
    const navigateBack = ReactReduxHistory.useNavigateBack();
    return (
      <>
        <div>Signin</div>
        <button onClick={navigateBack}>Back</button>
      </>
    );
  };
  const Profile = () => {
    const { id } = ReactReduxHistory.usePath(RoutePaths.Profile);
    const { tab } = ReactRedux.useSelector((state) => state.location.hash);
    return (
      <div>
        Profile-{id}-{tab}
      </div>
    );
  };
  const routes = {
    [RoutePaths.Home]: <Home />,
    [RoutePaths.Profile]: <Profile />,
    [RoutePaths.Signin]: <Signin />,
  };
  const App = () => {
    const routeResult = ReactReduxHistory.useRoutes(routes);
    return <>{routeResult}</>;
  };
  const rootComponent = (
    <ReactRedux.Provider store={store}>
      <App />
    </ReactRedux.Provider>
  );
  const { container, getByText } = render(rootComponent);

  // then initially Home is rendered
  expect(getByText('Home')).toBeInTheDocument();

  // when navigating
  fireEvent.click(getByText('Login'));

  // then Signin is rendered
  await waitFor(() => getByText('Signin'));

  // when clicking browser back
  fireEvent.click(getByText('Back'));

  // then Home is rendered
  await waitFor(() => getByText('Home'));

  // when navigating with hash parameter
  fireEvent.click(getByText('Profile'));

  // then Profile is rendered with those parameters
  await waitFor(() => getByText('Profile-47-all'));

  // when navigating to non-existing page
  ReduxHistory.history.push('/notyet');

  // then nothing is rendered
  expect(getNodeText(container)).toEqual('');
});
