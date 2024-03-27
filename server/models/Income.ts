import mongoose from 'mongoose';

interface IIncome extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  amount: number;
  date?: Date;
  recurring:
    | 'One-time'
    | 'Weekly'
    | 'Bi-Weekly'
    | 'Monthly'
    | 'Quarterly'
    | 'Annually'
    | 'Semi-Monthly';
}

const incomeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: Date,
  recurring: {
    type: String,
    enum: [
      'One-time',
      'Weekly',
      'Bi-Weekly',
      'Monthly',
      'Quarterly',
      'Annually',
      'Semi-Monthly',
    ],
    required: true,
  },
});

const Income = mongoose.model<IIncome>('Income', incomeSchema);

export default Income;
