import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from '../lib/react-redux-history';
import TransactionRow from './TransactionRow';

export default () => {
  const navigate = useNavigate();
  const { selectedAccountName } = useSelector(state => state.location.hash);
  const txListAll = useSelector(state =>
    Object.values(state.account.transaction)
  );
  const txList = selectedAccountName
    ? txListAll.filter(tx => tx.accountName === selectedAccountName)
    : txListAll;
  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Text</td>
            <td>Amount</td>
            {selectedAccountName ? null : <td>Account</td>}
          </tr>
        </thead>
        <tbody>
          {txList.map(tx => (
            <TransactionRow id={tx.id} key={tx.id} />
          ))}
        </tbody>
      </table>
      <button onClick={navigate('/')}>Home</button>
    </>
  );
};
