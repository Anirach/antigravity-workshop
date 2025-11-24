import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { fetchExpenses } from './services/api';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('expenses');

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

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="view-content">
            <h1>Dashboard</h1>
            <div className="dashboard-grid">
              <div className="stat-card">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <span className="stat-label">Total Expenses</span>
                  <span className="stat-value">{expenses.length}</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💸</div>
                <div className="stat-info">
                  <span className="stat-label">Total Amount</span>
                  <span className="stat-value">
                    ฿{expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'expenses':
        return (
          <div className="view-content">
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
      case 'analytics':
        return (
          <div className="view-content">
            <h1>Analytics</h1>
            <div className="card">
              <p style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                📊 Analytics view coming soon...
              </p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="view-content">
            <h1>Settings</h1>
            <div className="card">
              <p style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>
                ⚙️ Settings view coming soon...
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
