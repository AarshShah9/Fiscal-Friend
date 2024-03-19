import mongoose, { Document, Schema } from 'mongoose';

interface IExpense extends Document {
  name: string;
  amount: number;
  date?: Date;
  recurring: 'One-time' | 'Weekly' | 'Bi-Weekly' | 'Monthly' | 'Quarterly' | 'Annually';
  category: 'Food' | 'Utilities' | 'Rent' | 'Transportation' | 'Insurance' | 'Wellness' | 'Entertainment' | 'Other';
}

const expenseSchema: Schema<IExpense> = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: Date,
  recurring: {
    type: String,
    enum: ['Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Annually'],
    required: true,
  },
  category: { type: String, required: true, enum: ['Food', 'Utilities', 'Rent', 'Transportation', 'Insurance', 'Wellness', 'Entertainment', 'Other'] },
});

const Expense = mongoose.model<IExpense>('Expense', expenseSchema);

export default Expense;
