import { Request, Response } from "express";
import { z, ZodError } from "zod";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  res.status(201).json({ message: "User created successfully" });
};
