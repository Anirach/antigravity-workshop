import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { fetchExpenses } from './services/api';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      const data = await fetchExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Error loading expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExpenseAdded = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
  };

  return (
    <div className="container">
      <h1>Expense Tracker</h1>
      <ExpenseForm onExpenseAdded={handleExpenseAdded} />
      {loading ? (
        <div className="card">
          <p style={{ textAlign: 'center', padding: '1rem' }}>Loading...</p>
        </div>
      ) : (
        <ExpenseList expenses={expenses} />
      )}
    </div>
  );
}

export default App;
