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

export const AdminRoutes = router;
