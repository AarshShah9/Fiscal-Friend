import mongoose from 'mongoose';

const bondSchema = new mongoose.Schema({
    issuer: { type: String, required: true },
    maturityDate: Date,
    interestRate: Number,
    faceValue: Number,
    currentMarketValue: Number,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Bond = mongoose.model('Bond', bondSchema);

export default Bond;