import React from 'react';

const ExpenseList = ({ expenses }) => {
    if (expenses.length === 0) {
        return (
            <div className="card">
                <div className="empty-state">
                    <p>No expenses recorded yet.</p>
                    <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        Add your first expense to get started!
                    </p>
                </div>
            </div>
        );
    }

    const getCategoryClass = (category) => {
        return category.toLowerCase();
    };

    return (
        <div>
            <ul className="expense-list">
                {expenses.map((expense, index) => (
                    <li
                        key={expense.id}
                        className="expense-card"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="expense-item">
                            <div className="expense-info">
                                <h3>{expense.description}</h3>
                                <div className="expense-meta">
                                    <span className={`category-badge ${getCategoryClass(expense.category)}`}>
                                        {expense.category}
                                    </span>
                                    <span className="expense-date">
                                        {new Date(expense.createdAt).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </span>
                                </div>
                            </div>
                            <div className="expense-amount">
                                ฿{parseFloat(expense.amount).toFixed(2)}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpenseList;
