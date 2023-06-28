import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { AdminValidate } from "./admin.validate";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(AdminValidate.createAdminZodSchema),
  AdminController.createAdmin
);

router.post(
  "/login",
  validateRequest(AdminValidate.loginZodSchema),
  AdminController.loginAdmin
);

router.post(
  "/refresh-token",
  validateRequest(AdminValidate.refreshTokenZodSchema),
  AdminController.refreshToken
);

export const AdminRoutes = router;
