import { registerUser } from "../controllers/userController";
import express from "express";
import { validateRequest } from "../middleware/validateRequest";
import { registerUserSchema } from "../zodSchema";

const router = express.Router();

router.route("/register").post(validateRequest(registerUserSchema), registerUser);

export default router;
