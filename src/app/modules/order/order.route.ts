import express from "express";
import { OrderController } from "./order.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { OrderValidate } from "./order.validate";
import { auth } from "../../middleware/auth";
import { ENUM_USER_ROLE } from "../../../enums/user";

const router = express.Router();

router.get(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  OrderController.getSingleOrder
);

router.post(
  "/create-order",
  auth(ENUM_USER_ROLE.BUYER),
  validateRequest(OrderValidate.createOrderZodSchema),
  OrderController.createOrder
);

router.get("/", OrderController.getAllOrders);

export const OrderRoutes = router;
