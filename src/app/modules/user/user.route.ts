import express from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { UserValidate } from "./user.validate";
import { auth } from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.get(
  "/my-profile",
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.getMyProfile
);

router.patch(
  "/my-profile",
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.updateMyProfile
);

router.get("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidate.updateUserZodSchema),
  UserController.updateSingleUser
);
router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

export const UserRoutes = router;
