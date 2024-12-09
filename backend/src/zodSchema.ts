import { z } from "zod";

export const registerUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be atleast 6 chars long" }),
});
