import React from "react";
import App from "./App";
import * as ReactRedux from "react-redux";
import * as Redux from "redux";
import ReduxThunk from "redux-thunk";
import * as ReduxHistory from "./lib/redux-history";
import { rootReducer } from "./store";

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
const middleware = composeEnhancers(
  Redux.applyMiddleware(ReduxThunk),
  Redux.applyMiddleware(ReduxHistory.locationMiddleware)
);

export const createRootElement = () => {
  const store = setupStore();
  return connect(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    store
  );
};

export const setupStore = () => {
  const store = Redux.createStore(rootReducer, middleware);
  ReduxHistory.listen(store);
  return store;
};

export const connect = (element, store) => {
  return <ReactRedux.Provider store={store}>{element}</ReactRedux.Provider>;
};
