const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(cors());
app.use(express.json());

// Get all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch expenses' });
  }
});

// Create a new expense
app.post('/api/expenses', async (req, res) => {
  const { description, amount, category } = req.body;
  try {
    const expense = await prisma.expense.create({
      data: {
        description,
        amount: parseFloat(amount),
        category,
      },
    });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create expense' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
