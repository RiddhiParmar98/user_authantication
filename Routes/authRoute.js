import express from "express";
import { login, createUser, forgetPassword,resetPassword } from "../controllers/auth.js";
const router = express.Router();

router.post("/register", createUser)
router.post("/login", login);
router.post("/forget-password", forgetPassword);
router.post("/reset-password/:userId/:resetToken", resetPassword);

export default router;

