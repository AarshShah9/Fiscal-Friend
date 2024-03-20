import mongoose, { model, Schema, Model, Document } from 'mongoose';

export interface ISavings extends Document {
  user: mongoose.Types.ObjectId;
  savingAccount: {
    chequing: Number;
    savings: Number;
    resp: Number;
  };
  loanAccount: {
    loc: Number;
    mortgage: Number;
  };
}

const SavingsSchema: Schema<ISavings> = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  savingAccount: {
    chequing: { type: Number, required: true },
    savings: { type: Number, required: true },
    resp: { type: Number, required: false },
  },
  loanAccount: {
    loc: { type: Number, required: false },
    mortgage: { type: Number, required: false },
  },
});

export const SavingsModel: Model<ISavings> = model<ISavings>(
  'Savings',
  SavingsSchema
);
