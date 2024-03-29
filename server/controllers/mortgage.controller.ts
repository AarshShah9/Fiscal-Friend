import { User } from '../models';
import Mortgage from '../models/Mortgage';
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

  if (!req.body.amount || !req.body.apr || !req.body.period || !req.body.frequency) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid request body' });
  }

  const mortgageAmount = req.body.amount;
  const mortgageAPR = req.body.apr / 100;
  const mortgagePeriod = req.body.period;
  const mortgageFrequency = req.body.frequency;
  const mortgageEAR = (1 + mortgageAPR / 2) ** 2 - 1;

  let numberPayments = 0;
  let mortgageEPR = 0;
  let interestPayment = 0;
  let monthly = 0;

  if (mortgageFrequency === 'Monthly (12x per year)') {
    numberPayments = mortgagePeriod * 12;
    mortgageEPR = (1 + mortgageEAR) ** (1 / 12) - 1;
    interestPayment = mortgageAmount * mortgageEPR;
    monthly =
      mortgageAmount /
      ((1 - 1 / (1 + mortgageEPR) ** numberPayments) / mortgageEPR);
  } else if (mortgageFrequency === 'Semi-Monthly (24x per year)') {
    numberPayments = mortgagePeriod * 24;
    mortgageEPR = (1 + mortgageEAR) ** (1 / 24) - 1;
    interestPayment = mortgageAmount * mortgageEPR;
    monthly =
      mortgageAmount /
      ((1 - 1 / (1 + mortgageEPR) ** numberPayments) / mortgageEPR);
  } else if (mortgageFrequency === 'Bi-Weekly (every 2 weeks)') {
    numberPayments = mortgagePeriod * 26;
    mortgageEPR = (1 + mortgageEAR) ** (1 / 26) - 1;
    interestPayment = mortgageAmount * mortgageEPR;
    monthly =
      mortgageAmount /
      ((1 - 1 / (1 + mortgageEPR) ** numberPayments) / mortgageEPR);
  }

  const firstPayment = monthly - interestPayment;

  const newMortgage = new Mortgage({
    user: req.body.user,
    mortgage: {
      amount: req.body.amount,
      apr: req.body.apr,
      period: req.body.period,
    },
    payments: {
      epr: (mortgageEPR * 100).toFixed(2),
      interestPayment: interestPayment.toFixed(2),
      firstPayment: firstPayment.toFixed(2),
      payment: monthly.toFixed(2),
    },
    frequency: req.body.frequency,
  });

  try {
    const savedMortgage = await newMortgage.save();

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

  const mortgage = await Mortgage.findOne({ user: req.body.user });

  return res.status(201).json({ success: true, mortgage });
};

export const updateMortgage = async (req: Request, res: Response) => {
  if (!req.body.user) {
    return res
      .status(400)
      .json({ success: false, message: 'User not authenticated' });
  }

  const user = await User.findById(req.body.user);

  if (!user) {
    return res.status(400).json({ success: false, message: 'User not found' });
  }

  if (!req.body.amount || !req.body.apr || !req.body.period || !req.body.frequency) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid request body' });
  }

  const mortgageAmount = req.body.amount;
  const mortgageAPR = req.body.apr / 100;
  const mortgagePeriod = req.body.period;
  const mortgageFrequency = req.body.frequency;
  const mortgageEAR = (1 + mortgageAPR / 2) ** 2 - 1;

  let numberPayments = 0;
  let mortgageEPR = 0;
  let interestPayment = 0;
  let monthly = 0;

  if (mortgageFrequency === 'Monthly (12x per year)') {
    numberPayments = mortgagePeriod * 12;
    mortgageEPR = (1 + mortgageEAR) ** (1 / 12) - 1;
    interestPayment = mortgageAmount * mortgageEPR;
    monthly =
      mortgageAmount /
      ((1 - 1 / (1 + mortgageEPR) ** numberPayments) / mortgageEPR);
  } else if (mortgageFrequency === 'Semi-Monthly (24x per year)') {
    numberPayments = mortgagePeriod * 24;
    mortgageEPR = (1 + mortgageEAR) ** (1 / 24) - 1;
    interestPayment = mortgageAmount * mortgageEPR;
    monthly =
      mortgageAmount /
      ((1 - 1 / (1 + mortgageEPR) ** numberPayments) / mortgageEPR);
  } else if (mortgageFrequency === 'Bi-Weekly (every 2 weeks)') {
    numberPayments = mortgagePeriod * 26;
    mortgageEPR = (1 + mortgageEAR) ** (1 / 26) - 1;
    interestPayment = mortgageAmount * mortgageEPR;
    monthly =
      mortgageAmount /
      ((1 - 1 / (1 + mortgageEPR) ** numberPayments) / mortgageEPR);
  }

  const firstPayment = monthly - interestPayment;

  try {
    const updateMortgage = await Mortgage.findOneAndUpdate(
      { user: req.body.user },
      {
        $set: {
          'mortgage.amount': req.body.amount,
          'mortgage.apr': req.body.apr,
          'mortgage.period': req.body.period,
          'payments.epr': (mortgageEPR * 100).toFixed(2),
          'payments.interestPayment': interestPayment.toFixed(2),
          'payments.firstPayment': firstPayment.toFixed(2),
          'payments.payment': monthly.toFixed(2),
          frequency: req.body.frequency,
        },
      },
      { new: true, useFindAndModify: false }
    );

    return res.status(201).json({
      success: true,
      message: 'Mortgage updated',
      mortgage: updateMortgage,
    });
  } catch (e) {
    return res.status(500).json({ success: false, message: 'Server error', e });
  }
};
