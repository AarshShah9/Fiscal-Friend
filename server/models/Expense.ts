import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: Date,
  recurring: Boolean,
  recurringWeeks: Number,
  category: String,
});

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
