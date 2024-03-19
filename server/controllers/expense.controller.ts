import { Expense, User } from '../models';
import { Request, Response } from 'express';

export const createExpense = async (req: Request, res: Response) => {
    if (!req.body.user) {
        return res.status(400).json({ success: false, message: 'User not authenticated' });
    }

    const user = await User.findById(req.body.user);
    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
    }

    const newExpense = new Expense({
        name: req.body.name,
        amount: req.body.amount,
        date: req.body.date,
        recurring: req.body.recurring,
        category: req.body.category,
    });
    
    user.Expenses.push(newExpense._id);

    await user.save();

    try {
        await newExpense.save();
        return res.status(201).json({ success: true, message: 'Expense created', expense: newExpense });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};


export const getExpenses = async (req: Request, res: Response) => {
    if (!req.body.user) {
        return res.status(400).json({ success: false, message: 'User not authenticated' });
    }

    const user = await User.findById(req.body.user);
    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
    }

    let expenses = [];
    for (let i = 0; i < user.Expenses?.length; i++) {
        expenses.push(await Expense.findById(user.Expenses[i]));
    }

    return res.status(201).json({ success: true, expenses });
};


export const removeExpense = async (req: Request, res: Response) => {
    if (!req.body.user) {
        return res.status(400).json({ success: false, message: 'User not authenticated' });
    }

    const user = await User.findById(req.body.user);

    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
    }

    const expense = await Expense.findById(req.body.expese);

    if (!expense) {
        return res.status(400).json({ success: false, message: 'Expense not found' });
    }

    user.Expenses = user.Expenses.filter((id) => id !== expense._id);

    await user.save();

    try {
        await Expense.findByIdAndDelete(expense._id);
        return res.status(201).json({ success: true, message: 'Expense removed' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

