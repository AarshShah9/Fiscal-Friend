import mongoose, { model, Schema, Model, Document } from 'mongoose';

export interface IMortgage extends Document {
  user: mongoose.Types.ObjectId;
  mortgage: {
    amount: number;
    apr: number;
    period: number;
  };
  payments: {
    epr: number;
    interestPayment: number;
    firstPayment: number;
    payment: number;
  };
  frequency:
    | 'Bi-Weekly (every 2 weeks)'
    | 'Semi-Monthly (24x per year)'
    | 'Monthly (12x per year)';
}

const mortgageSchema: Schema<IMortgage> = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  mortgage: {
    amount: { type: Number, required: true },
    apr: { type: Number, required: true },
    period: { type: Number, required: true },
  },
  payments: {
    epr: { type: Number, required: false },
    interestPayment: { type: Number, required: false },
    firstPayment: { type: Number, required: false },
    payment: { type: Number, required: false },
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

const Mortgage: Model<IMortgage> = model<IMortgage>('Mortgage', mortgageSchema);

export default Mortgage;
