import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true, unique: true },
  interestRate: Number,
  currentBalance: Number,
});

const Account = mongoose.model('Account', accountSchema);

export default Account;
