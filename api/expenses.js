import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const expenses = await prisma.expense.findMany({
                orderBy: {
                    createdAt: 'desc',
                },
            });
            return res.status(200).json(expenses);
        }

        if (req.method === 'POST') {
            const { description, amount, category } = req.body;
            const expense = await prisma.expense.create({
                data: {
                    description,
                    amount: parseFloat(amount),
                    category,
                },
            });
            return res.status(200).json(expense);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
