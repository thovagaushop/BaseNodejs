import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import authenticateMiddleware from "../middlewares/authenticate.middleware.js";

const router = Router();

router.post("/login", authenticateMiddleware, authController.login);
router.post("/register", authController.register);

export default router;
