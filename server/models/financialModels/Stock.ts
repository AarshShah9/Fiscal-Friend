import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  marketSector: String,
  currentPrice: { type: Number, required: true },
  priceHistory: [{ date: Date, price: Number }],
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
