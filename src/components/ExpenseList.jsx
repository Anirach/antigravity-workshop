import React from 'react';

const ExpenseList = ({ expenses }) => {
    if (expenses.length === 0) {
        return (
            <div className="card">
                <div className="empty-state">
                    <p>No expenses recorded yet.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <ul className="expense-list">
                {expenses.map((expense) => (
                    <li key={expense.id} className="expense-item">
                        <div className="expense-info">
                            <h3>{expense.description}</h3>
                            <div className="expense-meta">
                                {expense.category} • {new Date(expense.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="expense-amount">
                            ฿{parseFloat(expense.amount).toFixed(2)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
