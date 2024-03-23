import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  symbol: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  boughtPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Stock = mongoose.model('Stock', stockSchema);
export default Stock;
