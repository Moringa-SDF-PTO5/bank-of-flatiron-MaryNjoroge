import React, { useState, useEffect } from 'react';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import axios from 'axios';

const App = () => {
  const api = "http://localhost:3000/transactions";
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch transactions from the backend when the component mounts
    fetchTransactions();
  }, []);

  const fetchTransactions = () => {
    fetch(api)
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  };

  const addTransaction = (transaction) => {
    fetch('http://localhost:3000/transactions', transaction)
      .then(() => {
        fetchTransactions(); // Refresh transactions after adding a new one
      })
      .catch(error => {
        console.error('Error adding transaction:', error);
      });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Bank Transactions</h1>
      <TransactionForm addTransaction={addTransaction} />
      <input type="text" placeholder="Search by description" value={searchTerm} onChange={handleSearch} />
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
};

export default App;
