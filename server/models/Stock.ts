import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  symbol: { type: String, required: true, unique: true },
});

const Stock = mongoose.model('Stock', stockSchema);
export default Stock;
