import { Request, Response } from "express";
import { UserModel } from "../db/modals/User";
import asyncHandler from "../middleware/asyncHandler";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await UserModel.exists({ email });
  if (user) {
    res.status(400).json({ msg: "User with email already exists" });
    return;
  }
  const newUser = await UserModel.create({ name, email, password });
  const token = newUser.createJWT();
  res.status(201).json({ newUser, token });
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    res.status(404).json({ msg: "Invalid credentials" });
    return;
  }

  const token = user.createJWT();
  res.status(200).json({ user, token });
});
