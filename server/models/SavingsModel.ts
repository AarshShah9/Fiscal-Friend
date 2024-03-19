import mongoose, { model, Schema, Model, Document } from 'mongoose';

export interface SavingsTask extends Document {
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

const SavingsSchema: Schema = new Schema({
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

export const SavingsModel: Model<SavingsTask> = model<SavingsTask>(
  'todos',
  SavingsSchema
);
