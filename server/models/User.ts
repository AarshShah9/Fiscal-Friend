import mongoose, { Schema, Document } from 'mongoose';
const bcrypt = require("bcrypt");

interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  createdAt: { type: Date, default: new Date()},
});

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
