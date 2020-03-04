import React from 'react';
import { useNavigate } from './lib/react-redux-history';

export default () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={navigate('/account')}>
        See your latest transactions
      </button>
    </>
  );
};
