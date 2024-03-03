import mongoose from 'mongoose';

const mutualFundSchema = new mongoose.Schema({
    fundName: { type: String, required: true },
    fundManager: String,
    nav: Number,
    expenseRatio: Number,
    performanceHistory: [{ date: Date, nav: Number }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const MutualFund = mongoose.model('MutualFund', mutualFundSchema);

export default MutualFund;