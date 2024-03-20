import User from '../models/User';
import { SavingsModel } from '../models/SavingsModel';
import { Request, Response } from 'express';

export const createSavings = async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }

  const user = await User.findById(req.body.user);

  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  if (!req.body.user || !req.body.chequing || !req.body.savings) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid request body' });
  }

  const newSavings = new SavingsModel({
    user: req.body.user,
    savingAccount: {
      chequing: req.body.chequing,
      savings: req.body.savings,
      resp: req.body.resp,
    },
    loanAccount: {
      loc: req.body.loc,
      mortgage: req.body.mortgage,
    },
  });

  user.Savings.push(newSavings._id);

  await user.save();

  try {
    await newSavings.save();
    return res
      .status(201)
      .json({ success: true, message: 'Savings created', expense: newSavings });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Server error', e });
  }
};

export const getSavings = async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }
  const savings = await SavingsModel.find({ user: req.body.user });
  return res.status(201).json({ success: true, savings });
};

export const updateSavings = async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }

  const user = await User.findById(req.body.user);

  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  if (!req.body.user || !req.body.chequing || !req.body.savings) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid request body' });
  }

  const updateSavings = new SavingsModel({
    user: req.body.user,
    savingAccount: {
      chequing: req.body.chequing,
      savings: req.body.savings,
      resp: req.body.resp,
    },
    loanAccount: {
      loc: req.body.loc,
      mortgage: req.body.mortgage,
    },
  });

  user.Savings.push(updateSavings._id);

  await user.save();

  try {
    await updateSavings.save();
    return res
      .status(201)
      .json({
        success: true,
        message: 'Savings created',
        expense: updateSavings,
      });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Server error', e });
  }
};
