import mongoose from 'mongoose';

const equitySchema = new mongoose.Schema({
    equityName: {type: String, required: true},
    numberOfShares: {type: Number, required: true},
    purchasePrice: Number,
    currentValue: Number,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const Equity = mongoose.model('Equity', equitySchema);

export default Equity;