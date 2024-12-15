import { NextFunction } from "express";
import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import * as jwt from "jsonwebtoken";

export interface IUser {
  name: string;
  email: string;
  password: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  createJWT: () => string;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, index: true },
  password: { type: String, required: true, select: false },
});

UserSchema.pre("save", async function (next: NextFunction) {
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  const isMatch = await bcryptjs.compare(candidatePassword, this.password);
  return isMatch;
};

UserSchema.methods.createJWT = function () {
  const token = jwt.sign({ userId: this._id, email: this.email }, process.env.JWT_SECRET, { expiresIn: "30d" });
  return token;
};

export const UserModel = mongoose.model("User", UserSchema);
