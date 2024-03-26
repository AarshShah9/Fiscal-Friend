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

  if (!req.body.chequing || !req.body.savings) {
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

  try {
    const savedSavings = await newSavings.save();

    await User.findByIdAndUpdate(
      req.body.user,
      { $push: { Savings: savedSavings._id } },
      { new: true, useFindAndModify: false }
    );

    return res.status(201).json({
      success: true,
      message: 'Savings created',
      savings: newSavings,
    });
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

  if (!req.body.chequing || !req.body.savings) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid request body' });
  }

  try {
    const updateSavings = await SavingsModel.findByIdAndUpdate(
      user.Savings[0],
      {
        $set: {
          'savingAccount.chequing': req.body.chequing,
          'savingAccount.savings': req.body.savings,
          'savingAccount.resp': req.body.resp,
          'loanAccount.loc': req.body.loc,
          'loanAccount.mortgage': req.body.mortgage,
        },
      },
      { new: true, useFindAndModify: false }
    );

    return res.status(201).json({
      success: true,
      message: 'Savings created',
      savings: updateSavings,
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Server error', e });
  }
};

export const getAllSavings = async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }

  const user = await User.findById(req.body.user);

  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }
  let savings = await SavingsModel.find({ user: req.body.user });
  let amounts = savings.map((s) => {
    return (
      (s.savingAccount.chequing as number) +
      (s.savingAccount.savings as number) +
      (s.savingAccount.resp as number)
    );
  });
  const netWorth = amounts.reduce((a, b) => a + b, 0);

  return res.status(201).json({
    success: true,
    netWorth: netWorth,
  });
};

export const removeSavings = async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }

  try {
    await SavingsModel.findByIdAndDelete(req.body.savings);
    return res.status(201).json({ success: true, message: 'Savings removed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
