import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { AdminValidate } from "./admin.validate";
import { AdminController } from "./admin.controller";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { auth } from "../../middleware/auth";

const router = express.Router();

router.get(
  "/my-profile",
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.getMyProfile
);

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
