import mongoose from 'mongoose';

interface IIncome extends Document {
  name: string;
  amount: number;
  date?: Date;
  recurring: 'One-time' | 'Weekly' | 'Bi-Weekly' | 'Monthly' | 'Quarterly' | 'Annually';
  category?: string;
}

const incomeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: Date,
  recurring: { type: String, enum: ['One-time', 'Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Annually'], required: true},
  category: String,
});

const Income = mongoose.model<IIncome>('Income', incomeSchema);

export default Income;
