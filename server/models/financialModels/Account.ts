import mongoose = require('mongoose');

const savingsAccountSchema = new mongoose.Schema({
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true },
    interestRate: Number,
    currentBalance: Number,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Account = mongoose.model('Account', savingsAccountSchema);

export default Account;