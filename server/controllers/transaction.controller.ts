import { Request, Response } from 'express';
import { Expense, Income } from '../models';

interface ITransaction {
    id: string,
    name: string,
    date: Date | undefined,
    amount: number,
    category: string | null,
    icon: 'in' | 'out',
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
        
        const transactions: ITransaction[] = [];

        oneTimeExpenses.forEach(expense => {
            transactions.push({
                id: expense._id.toHexString(),
                name: expense.name,
                date: expense.date,
                amount: expense.amount,
                category: expense.category,
                icon: 'out',
            });
        });

        oneTimeIncomes.forEach(income => {
            transactions.push({
                id: income._id.toHexString(),
                name: income.name,
                date: income.date,
                amount: income.amount,
                category: null,
                icon: 'in',
            });
        });

        recurringExpenses.forEach(expense => {
            let currentWeek = Math.floor(currentDate.getDate() / 7);
            let currentMonth = currentDate.getMonth();
            switch(expense.recurring) {
                case 'Weekly':
                    for (let week = 0; week < currentWeek; week++) {
                        transactions.push({
                            id: expense._id.toHexString(),
                            name: expense.name,
                            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), week * 7 + 1),
                            amount: expense.amount,
                            category: expense.category,
                            icon: 'out',
                        });
                    }
                    break;
                case 'Bi-Weekly':
                    for (let week = 0; week < currentWeek; week += 2) {
                        transactions.push({
                            id: expense._id.toHexString(),
                            name: expense.name,
                            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), week * 7 + 1),
                            amount: expense.amount,
                            category: expense.category,
                            icon: 'out',
                        });
                    }
                    break;
                case 'Monthly':
                    transactions.push({
                        id: expense._id.toHexString(),
                        name: expense.name,
                        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                        amount: expense.amount,
                        category: expense.category,
                        icon: 'out',
                    });
                    break;
                case 'Quarterly':
                    if(currentMonth % 3 === 0) {
                        transactions.push({
                            id: expense._id.toHexString(),
                            name: expense.name,
                            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                            amount: expense.amount,
                            category: expense.category,
                            icon: 'out',
                        });
                    }
                    break;
                case 'Annually':
                    if(currentMonth === 0) {
                        transactions.push({
                            id: expense._id.toHexString(),
                            name: expense.name,
                            date: new Date(currentDate.getFullYear(), 0, 1),
                            amount: expense.amount,
                            category: expense.category,
                            icon: 'out',
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
                        transactions.push({
                            id: income._id.toHexString(),
                            name: income.name,
                            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), week * 7 + 1),
                            amount: income.amount,
                            category: null,
                            icon: 'in',
                        });
                    }
                    break;
                case 'Bi-Weekly':
                    for (let week = 0; week < currentWeek; week += 2) {
                        transactions.push({
                            id: income._id.toHexString(),
                            name: income.name,
                            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), week * 7 + 1),
                            amount: income.amount,
                            category: null,
                            icon: 'in',
                        });
                    }
                    break;
                case 'Monthly':
                    transactions.push({
                        id: income._id.toHexString(),
                        name: income.name,
                        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                        amount: income.amount,
                        category: null,
                        icon: 'in',
                    });
                    break;
                case 'Quarterly':
                    if(currentMonth % 3 === 0) {
                        transactions.push({
                            id: income._id.toHexString(),
                            name: income.name,
                            date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
                            amount: income.amount,
                            category: null,
                            icon: 'in',
                        });
                    }
                    break;
                case 'Annually':
                    if(currentMonth === 0) {
                        transactions.push({
                            id: income._id.toHexString(),
                            name: income.name,
                            date: new Date(currentDate.getFullYear(), 0, 1),
                            amount: income.amount,
                            category: null,
                            icon: 'in',
                        });
                    }
                    break;
            };
        });
        
        //sort by date descending
        transactions.sort((a, b) => {
            return a.date?.getTime()! - b.date?.getTime()!;
        });
        return res.status(201).json({ success: true, transactions });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        return res.status(400).json({ success: false, message: 'Internal server error', error });
    }
};