import mongoose, { model, Schema, Model, Document } from 'mongoose';

interface IMortgage extends Document {
  user: mongoose.Types.ObjectId;
  mortgage: {
    amount: Number;
    apr: Number;
    period: Number;
  };
  payments: {
    principal: Number;
    ear: Number;
    repayment: Number;
    total: Number;
  };
  frequency:
    | 'Bi-Weekly (every 2 weeks)'
    | 'Semi-Monthly (24x per year)'
    | 'Monthly (12x per year)';
}

const mortgageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mortgage: {
    amount: { type: Number, required: true },
    apr: { type: Number, required: true },
    period: { type: Number, required: true },
  },
  payments: {
    principal: { type: Number, required: false },
    ear: { type: Number, required: false },
    repayment: { type: Number, required: false },
    total: { type: Number, required: false },
  },
  frequency: {
    type: String,
    required: true,
    enum: [
      'Bi-Weekly (every 2 weeks)',
      'Semi-Monthly (24x per year)',
      'Monthly (12x per year)',
    ],
  },
});

export const Mortgage: Model<IMortgage> = model<IMortgage>(
  'Mortgage',
  mortgageSchema
);
