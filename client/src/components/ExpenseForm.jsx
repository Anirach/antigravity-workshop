import React, { useState } from 'react';
import { createExpense } from '../services/api';

const ExpenseForm = ({ onExpenseAdded }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description || !amount) return;

        setLoading(true);
        try {
            const newExpense = await createExpense({
                description,
                amount: parseFloat(amount),
                category,
            });
            onExpenseAdded(newExpense);
            setDescription('');
            setAmount('');
            setCategory('Food');
        } catch (error) {
            console.error('Error adding expense:', error);
            alert('Failed to add expense');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. Lunch at Cafe"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="Food">Food</option>
                        <option value="Transport">Transport</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Adding...' : 'Add Expense'}
                </button>
            </form>
        </div>
    );
};

export default ExpenseForm;
