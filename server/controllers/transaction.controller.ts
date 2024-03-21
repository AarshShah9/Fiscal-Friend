import { Request, Response } from 'express';
import { Expense, Income } from '../models';

interface ITransaction {
    id: string,
    name: string,
    date: Date | undefined,
    amount: number,
    category: string | null,
    icon: 'in' | 'out',
    recurring: string,
}

interface IFormattedTransactions {
    date: string,
    transactions: ITransaction[],
}

export const getRecentTransactions = async (req: Request, res: Response) => {
    if(!req.body.user) {
        return res.status(400).json({ success: false, message: 'User is not authenticated' });
    }

    const currentDate = new Date();
    const lastMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

    try {
        // Get one-time expenses and incomes from the last month 
        const oneTimeExpenses = await Expense
            .find({ user: req.body.user, date: { $gte: lastMonth }, recurring: 'One-time' })
            .sort({ date: -1 })
            
        const oneTimeIncomes = await Income
            .find({ user: req.body.user, date: { $gte: lastMonth }, recurring: 'One-time' })
            .sort({ date: -1 });

        const recurringExpenses = await Expense
            .find({ user: req.body.user, recurring: { $ne: 'One-time' } })
            .sort({ date: -1 });

        const recurringIncomes = await Income
            .find({ user: req.body.user, recurring: { $ne: 'One-time' } })
            .sort({ date: -1 });
        
        const transactions: { [key: string]: ITransaction[] } = {};

        const addTransaction = (transaction: ITransaction) => {
            const dateKey = transaction.date?.toISOString().split('T')[0] ?? 'unknown';
            if (!transactions[dateKey]) {
                transactions[dateKey] = [];
            }
            transactions[dateKey].push(transaction);
        };

        oneTimeExpenses.forEach(expense => {
            addTransaction({
                id: expense._id.toHexString(),
                name: expense.name,
                date: expense.date,
                amount: expense.amount,
                category: expense.category,
                icon: 'out',
                recurring: 'One-time',
            });
        });

        oneTimeIncomes.forEach(income => {
            addTransaction({
                id: income._id.toHexString(),
                name: income.name,
                date: income.date,
                amount: income.amount,
                category: null,
                icon: 'in',
                recurring: 'One-time',
            });
        });

        recurringExpenses.forEach(expense => {
            let currentWeek = Math.floor(currentDate.getDate() / 7);
            let currentMonth = currentDate.getMonth();
            switch(expense.recurring) {
                case 'Weekly':
                    for (let week = 0; week < currentWeek; week++) {
                        addTransaction({
                            id: expense._id.toHexString(),
                            name: expense.name,
                            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), week * 7 + 1),
                            amount: expense.amount,
                            category: expense.category,
                            icon: 'out',
                            recurring: expense.recurring,
                        });
                    }
                    break;
                case 'Bi-Weekly':
                    for (let week = 0; week < currentWeek; week += 2) {
                        addTransaction({
                            id: expense._id.toHexString(),
                            name: expense.name,
                            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), week * 7 + 1),
                            amount: expense.amount,
                            category: expense.category,
                            icon: 'out',
                            recurring: expense.recurring,
                        });
                    }
                    break;
                case 'Monthly':
                    addTransaction({
                        id: expense._id.toHexString(),
                        name: expense.name,
                        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                        amount: expense.amount,
                        category: expense.category,
                        icon: 'out',
                        recurring: expense.recurring,
                    });
                    break;
                case 'Quarterly':
                    if(currentMonth % 3 === 0) {
                        addTransaction({
                            id: expense._id.toHexString(),
                            name: expense.name,
                            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                            amount: expense.amount,
                            category: expense.category,
                            icon: 'out',
                            recurring: expense.recurring,
                        });
                    }
                    break;
                case 'Annually':
                    if(currentMonth === 0) {
                        addTransaction({
                            id: expense._id.toHexString(),
                            name: expense.name,
                            date: new Date(currentDate.getFullYear(), 0, 1),
                            amount: expense.amount,
                            category: expense.category,
                            icon: 'out',
                            recurring: expense.recurring,
                        });
                    }
                    break;
            }
        });

        recurringIncomes.forEach(income => {
            let currentWeek = Math.floor(currentDate.getDate() / 7);
            let currentMonth = currentDate.getMonth();
            switch(income.recurring) {
                case 'Weekly':
                    for (let week = 0; week < currentWeek; week++) {
                        addTransaction({
                            id: income._id.toHexString(),
                            name: income.name,
                            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), week * 7 + 1),
                            amount: income.amount,
                            category: null,
                            icon: 'in',
                            recurring: income.recurring,
                        });
                    }
                    break;
                case 'Bi-Weekly':
                    for (let week = 0; week < currentWeek; week += 2) {
                        addTransaction({
                            id: income._id.toHexString(),
                            name: income.name,
                            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), week * 7 + 1),
                            amount: income.amount,
                            category: null,
                            icon: 'in',
                            recurring: income.recurring,
                        });
                    }
                    break;
                case 'Monthly':
                    addTransaction({
                        id: income._id.toHexString(),
                        name: income.name,
                        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                        amount: income.amount,
                        category: null,
                        icon: 'in',
                        recurring: income.recurring,
                    });
                    break;
                case 'Quarterly':
                    if(currentMonth % 3 === 0) {
                        addTransaction({
                            id: income._id.toHexString(),
                            name: income.name,
                            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                            amount: income.amount,
                            category: null,
                            icon: 'in',
                            recurring: income.recurring,
                        });
                    }
                    break;
                case 'Annually':
                    if(currentMonth === 0) {
                        addTransaction({
                            id: income._id.toHexString(),
                            name: income.name,
                            date: new Date(currentDate.getFullYear(), 0, 1),
                            amount: income.amount,
                            category: null,
                            icon: 'in',
                            recurring: income.recurring,
                        });
                    }
                    break;
            };
        });
        
        // Sort transactions by date
        const sortedDates = Object.keys(transactions).sort((a, b) => {
            return new Date(b).getTime() - new Date(a).getTime();
        });        const formattedTransactions = sortedDates.map(date => ({
            date: date,
            transactions: transactions[date].map(transaction => ({
                id: transaction.id,
                amount: transaction.amount.toFixed(2),
                name: transaction.name,
                category: transaction.category,
                icon: transaction.icon,
                recurring: transaction.recurring,
            })),
        }));

        return res.status(201).json({ success: true, formattedTransactions });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return res.status(400).json({ success: false, message: 'Internal server error', error });
    }
};