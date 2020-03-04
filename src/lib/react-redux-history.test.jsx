import React from 'react';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import { fireEvent, render, wait } from '@testing-library/react';

import * as ReduxHistory from './redux-history';
import * as ReactReduxHistory from './react-redux-history';

test('react-redux-history', async () => {
  // given initial setup
  const rootReducer = Redux.combineReducers({
    location: ReduxHistory.locationReducer
  });
  const middleware = Redux.compose(
    Redux.applyMiddleware(ReduxHistory.locationMiddleware)
  );
  const store = Redux.createStore(rootReducer, middleware);
  ReduxHistory.listen(store);
  const Home = () => {
    const navigate = ReactReduxHistory.useNavigate();
    return (
      <>
        <div>Home</div>
        <button onClick={navigate('/signin')}>Login</button>
        <button onClick={navigate('/profile', { id: 47 })}>Profile</button>
      </>
    );
  };
  const Signin = () => <div>Signin</div>;
  const Profile = () => {
    const id = ReactRedux.useSelector(state => state.location.hash.id);
    return <div>Profile {id}</div>;
  };
  const routes = {
    '/': <Home />,
    '/profile': <Profile />,
    '/signin': <Signin />
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
  const { getByText } = render(rootComponent);

  // then initially Home is rendered
  expect(getByText('Home')).toBeInTheDocument();

  // when navigating
  fireEvent.click(getByText('Login'));
  await wait(() => getByText('Signin'));

  // then Signin is rendered
  expect(getByText('Signin')).toBeInTheDocument();

  // when clicking browser back
  ReduxHistory.history.goBack();
  await wait(() => getByText('Home'));

  // then Home is rendered
  expect(getByText('Home')).toBeInTheDocument();

  // when navigating with hash parameter
  fireEvent.click(getByText('Profile'));
  await wait(() => getByText('Profile 47'));

  // // then Profile is rendered with that parameter
  expect(getByText('Profile 47')).toBeInTheDocument();
});
