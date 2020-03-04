import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from '../lib/react-redux-history';

export default ({ id }) => {
  const navigate = useNavigate();
  const { selectedAccountName, txId } = useSelector(
    state => state.location.hash
  );
  const tx = useSelector(state => state.account.transaction[id]);
  const hash = {
    selectedAccountName: tx.accountName,
    txId: tx.id
  };
  const className = txId === tx.id ? 'highlight' : '';
  const leftAlign = { textAlign: 'left' };
  const rightAlign = { textAlign: 'right' };
  return (
    <tr className={className} onClick={navigate('/account', hash)}>
      <td style={leftAlign}>{tx.text}</td>
      <td style={rightAlign}>{tx.amount}</td>
      {selectedAccountName ? null : <td style={leftAlign}>{tx.accountName}</td>}
    </tr>
  );
};
