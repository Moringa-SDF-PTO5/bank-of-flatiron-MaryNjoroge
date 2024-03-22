import React from 'react';

const TransactionList = ({ transactions }) => {
  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
