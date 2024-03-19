import mongoose, { Schema, Document } from 'mongoose';
const bcrypt = require('bcrypt');

interface IUser extends Document {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
  Accounts: mongoose.Types.ObjectId[];
  CreditCards: mongoose.Types.ObjectId[];
  Stocks: mongoose.Types.ObjectId[];
  Mortgages: mongoose.Types.ObjectId[];
  Expenses: mongoose.Types.ObjectId[];
  Incomes: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  createdAt: { type: Date, default: new Date() },
  Accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
  CreditCards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CreditCard' }],
  Stocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stock' }],
  Mortgages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mortgage' }],
  Expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
  Incomes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Income' }],
});

UserSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
