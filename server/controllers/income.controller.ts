import { User, Income } from '../models';
import { Request, Response } from 'express';

export const createIncome = async (req: Request, res: Response) => {
    if (!req.body.user) {
        return res.status(400).json({ success: false, message: 'User not authenticated' });
    }

    const user = await User.findById(req.body.user);

    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
    }

    if (!req.body.name || !req.body.amount || !req.body.date || !req.body.recurring) {
        return res.status(400).json({ success: false, message: 'Invalid request body' });
    }

    try {
        const newIncome = new Income({
            user: req.body.user,
            name: req.body.name,
            amount: req.body.amount,
            date: req.body.date,
            recurring: req.body.recurring,
        });

        user.Incomes.push(newIncome._id);

        await user.save();

        await newIncome.save();
        return res.status(201).json({ success: true, message: 'Income created', income: newIncome });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error });
    }
};

export const getIncomes = async (req: Request, res: Response) => {
    if (!req.body.user) {
        return res.status(400).json({ success: false, message: 'User not authenticated' });
    }

    const incomes = await Income.find({ user: req.body.user });

    return res.status(201).json({ success: true, incomes });
};

export const removeIncome = async (req: Request, res: Response) => {
    if (!req.body.user) {
        return res.status(400).json({ success: false, message: 'User not authenticated' });
    }

    const user = await User.findById(req.body.user);

    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
    }

    try {
        await Income.findByIdAndDelete(req.body.id);
        user.Incomes = user.Incomes.filter((income) => income !== req.body.id);
        await user.save();
        return res.status(201).json({ success: true, message: 'Income removed' });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};


