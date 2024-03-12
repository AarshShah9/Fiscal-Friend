import mongoose from "mongoose";

const creditCardSchema = new mongoose.Schema({
    cardNumber: { type: String, required: true, unique: true },
    expirationDate: Date,
    creditLimit: Number,
    currentDebt: Number,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const CreditCard = mongoose.model('CreditCard', creditCardSchema);

export default CreditCard;