import { Expense, User } from '../models';
import { Request, Response } from 'express';

export const createExpense = async (req: Request, res: Response) => {
    if (!req.body.user) {
        return res.status(400).json({ success: false, message: 'User not authenticated' });
    }

    if(!req.body.name || !req.body.amount || !req.body.date || !req.body.recurring || !req.body.category) {
        return res.status(400).json({ success: false, message: 'Invalid request body' });
    }

    const newExpense = new Expense({
        user: req.body.user,
        name: req.body.name,
        amount: req.body.amount,
        date: req.body.date,
        recurring: req.body.recurring,
        category: req.body.category,
    });

    try {
        await newExpense.save();
        return res.status(201).json({ success: true, message: 'Expense created', expense: newExpense });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
};


export const getExpenses = async (req: Request, res: Response) => {
    if (!req.body.user) {
        return res.status(400).json({ success: false, message: 'User not authenticated' });
    }

    const expenses = await Expense.find({ user: req.body.user });
    return res.status(201).json({ success: true, expenses });
};


export const removeExpense = async (req: Request, res: Response) => {
    if (!req.body.user) {
        return res.status(400).json({ success: false, message: 'User not authenticated' });
    }

    if (!req.body.expense) {
        return res.status(400).json({ success: false, message: 'Invalid request body' });
    }

    const expense = await Expense.findById(req.body.expense);

    if (!expense) {
        return res.status(400).json({ success: false, message: 'Expense not found' });
    }

    try {
        await Expense.findByIdAndDelete(expense._id);
        return res.status(201).json({ success: true, message: 'Expense removed' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

