import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { CowValidate } from "./cow.validate";
import { CowController } from "./cow.controller";
import { auth } from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getSingleCow
);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.SELLER),
  validateRequest(CowValidate.updateCowZodSchema),
  CowController.updateSingleCow
);
router.delete("/:id", auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);
router.post(
  "/create-cow",
  auth(ENUM_USER_ROLE.SELLER),
  validateRequest(CowValidate.createCowZodSchema),
  CowController.createCow
);
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  CowController.getAllCows
);

export const CowRoutes = router;
