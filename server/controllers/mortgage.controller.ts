import { User } from '../models';
import { Mortgage } from '../models/Mortgage';
import { Request, Response } from 'express';

export const createMortgage = async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }

  const user = await User.findById(req.body.user);

  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  if (!req.body.mortgage || !req.body.frequency) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid request body' });
  }

  const mortgageAmount = req.body.amount;
  const mortgageAPR = req.body.apr / 100;
  const mortgagePeriod = req.body.period;
  const mortgageFrequency = req.body.frequency;

  const numberPayments = mortgagePeriod * 12;
  const mortgageEAR = (1 + mortgageAPR / 2) ** 2 - 1;
  const mortgageEPR = (1 + mortgageEAR) ** (1 / 12) - 1;
  const interestPayment = mortgageAmount * mortgageEPR;
  const monthly =
    mortgageAmount /
    ((1 - 1 / (1 + mortgageEPR) ** numberPayments) / mortgageEPR);

  const firstPayment = monthly - interestPayment;

  const newMortgage = new Mortgage({
    user: req.body.user,
    mortgage: {
      amount: req.body.amount,
      apr: req.body.apr,
      period: req.body.period,
    },
    payments: {
      principal: (mortgageEPR * 100).toFixed(2),
      interest: interestPayment.toFixed(2),
      repayment: firstPayment.toFixed(2),
      total: monthly.toFixed(2),
    },
    frequency: req.body.frequency,
  });

  try {
    const savedMortgage = await newMortgage.save();

    await User.findByIdAndUpdate(
      req.body.user,
      { $push: { Mortgages: savedMortgage._id } },
      { new: true, useFindAndModify: false }
    );
    return res.status(201).json({
      success: true,
      message: 'Mortgage created',
      mortgage: newMortgage,
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Server error', e });
  }
};

export const getMortgage = async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }

  const savings = await Mortgage.find({ user: req.body.user });

  return res.status(201).json({ success: true, savings });
};
