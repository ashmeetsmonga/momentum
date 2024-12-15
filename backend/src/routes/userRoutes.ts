import { loginUser, registerUser } from "../controllers/userController";
import express from "express";
import { validateRequest } from "../middleware/validateRequest";
import { loginUserSchema, registerUserSchema } from "../zodSchema";

const router = express.Router();

router.route("/register").post(validateRequest(registerUserSchema), registerUser);
router.route("/login").post(validateRequest(loginUserSchema), loginUser);

export default router;
