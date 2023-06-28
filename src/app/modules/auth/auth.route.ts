import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { AuthValidate } from "./auth.validate";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(AuthValidate.createUserZodSchema),
  AuthController.createUser
);

router.post(
  "/login",
  validateRequest(AuthValidate.loginZodSchema),
  AuthController.loginUser
);

router.post(
  "/refresh-token",
  validateRequest(AuthValidate.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
