import { User, Income } from '../models';
import { Request, Response } from 'express';

export const createIncome = async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }

  if (!req.body.name || !req.body.amount || !req.body.recurring) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid request body' });
  }

  if (req.body.recurring === 'One-time' && !req.body.date) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid request body' });
  }

  if (req.body.recurring !== 'One-time') {
    req.body.date = undefined;
  }

  try {
    const newIncome = new Income({
      user: req.body.user,
      name: req.body.name,
      amount: req.body.amount,
      date: req.body.date,
      recurring: req.body.recurring,
    });

    await newIncome.save();
    return res
      .status(201)
      .json({ success: true, message: 'Income created', income: newIncome });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Server error', error });
  }
};

export const getIncomes = async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }

  const incomes = await Income.find({ user: req.body.user });

  return res.status(201).json({ success: true, incomes });
};

export const removeIncome = async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }

  const income = await Income.findOne({
    _id: req.body.income,
    user: req.body.user,
  });

  if (!income) {
    return res
      .status(400)
      .json({ success: false, message: 'Income not found' });
  }

  try {
    await Income.findByIdAndDelete(income._id);
    return res.status(201).json({ success: true, message: 'Income removed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
