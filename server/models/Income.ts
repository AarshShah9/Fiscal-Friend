import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: Date,
  recurring: Boolean,
  recurringWeeks: Number,
  category: String,
});

const Income = mongoose.model('Income', incomeSchema);

export default Income;
