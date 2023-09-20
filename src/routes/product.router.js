import { Router } from "express";
import * as productController from "../controllers/product.controller.js";
import jwtauthenticateMiddleware from "../middlewares/jwtauthenticate.middleware.js";

const router = Router();

router.get("/", jwtauthenticateMiddleware, productController.find);

export default router;
