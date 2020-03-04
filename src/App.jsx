import React from 'react';
import './App.css';
import Home from './Home';
import TransactionList from './account/TransactionList';
import { useRoutes } from './lib/react-redux-history';

const routes = {
  '/': <Home />,
  '/account': <TransactionList />
};

function App() {
  const routeResult = useRoutes(routes);
  return (
    <div className="App">
      <header className="App-header">{routeResult}</header>
    </div>
  );
}

export default App;
