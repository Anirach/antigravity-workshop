const API_URL = 'http://localhost:3000/api';

export const fetchExpenses = async () => {
    const response = await fetch(`${API_URL}/expenses`);
    if (!response.ok) {
        throw new Error('Failed to fetch expenses');
    }
    return response.json();
};

export const createExpense = async (expense) => {
    const response = await fetch(`${API_URL}/expenses`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
    });
    if (!response.ok) {
        throw new Error('Failed to create expense');
    }
    return response.json();
};
