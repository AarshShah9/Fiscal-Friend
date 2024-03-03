import mongoose from 'mongoose';

const mortgageSchema = new mongoose.Schema({
  propertyAddress: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  interestRate: Number,
  monthlyPayment: Number,
  startDate: Date,
  endDate: Date,
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Mortgage = mongoose.model('Mortgage', mortgageSchema);

module.exports = Mortgage;
