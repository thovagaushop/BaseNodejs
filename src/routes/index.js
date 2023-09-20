import { Router } from "express";
import userRouter from "./user.router.js";
import authRouter from "./auth.router.js";
const router = Router();
// User router
router.use("/user", userRouter);
// Auth
router.use("/auth", authRouter);

export default router;
