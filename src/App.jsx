import React, { useState, useEffect } from 'react';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import './App.css'

const App = () => {
  const api = "https://json-server-m.onrender.com/transactions";
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch transactions from the backend when the component mounts
    fetchTransactions();
  }, []);

  
  const fetchTransactions = () => {
    fetch(api)
      .then(response => response.json()) // Parse the response as JSON
      .then(data => {
        setTransactions(data);
      })
      .catch(error => {
        console.error('Error fetching transactions:', error);
      });
  };
  
  const addTransaction = (transaction) => {
    fetch(api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transaction),
    })
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
      <div className="Bank">
      <h1>Bank Transactions</h1>
      </div>
      <TransactionForm addTransaction={addTransaction} />
      <div className= "search">
      <input type="text" placeholder="Search your recent transactions" value={searchTerm} onChange={handleSearch} />
      </div>
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
};

export default App;
