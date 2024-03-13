import mongoose from 'mongoose';

const creditCardSchema = new mongoose.Schema({
  cardNumber: { type: String, required: true, unique: true },
  expirationDate: Date,
  creditLimit: Number,
  currentDebt: Number,
});

const CreditCard = mongoose.model('CreditCard', creditCardSchema);

export default CreditCard;
