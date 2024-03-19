import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: Date,
  recurring: { type: String, enum: ['One-time', 'Weekly', 'Bi-Weekly', 'Monthly', 'Quarterly', 'Annually'], required: true},
  category: String,
});

const Income = mongoose.model('Income', incomeSchema);

export default Income;
