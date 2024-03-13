import mongoose from 'mongoose';

const mortgageSchema = new mongoose.Schema({
  propertyAddress: { type: String, required: true },
  loanAmount: { type: Number, required: true },
  interestRate: Number,
  monthlyPayment: Number,
  startDate: Date,
  endDate: Date,
});

const Mortgage = mongoose.model('Mortgage', mortgageSchema);

export default Mortgage;
