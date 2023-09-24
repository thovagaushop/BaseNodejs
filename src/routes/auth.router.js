import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import authenticateMiddleware from "../middlewares/authenticate.middleware.js";
import {
  googleCallbackMiddleware,
  googleauthenticateMiddleware,
} from "../middlewares/googleauthenticate.middleware.js";
import StatusResponseConstant from "../common/constant/statusResponse.constant.js";
import MessageConstant from "../common/constant/message.constant.js";

const router = Router();

router.post("/login", authenticateMiddleware, authController.login);
router.post("/register", authController.register);
// Check authenticated
router.get("/authenticated/success", authController.login);
router.get("/authenticated/failed", authController.nonAuthenticated);
// Auth google
router.get("/google", googleauthenticateMiddleware);
router.get("/google/callback", googleCallbackMiddleware);
export default router;
