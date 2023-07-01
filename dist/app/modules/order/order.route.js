"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const order_validate_1 = require("./order.validate");
const auth_1 = require("../../middleware/auth");
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.get("/:id", (0, auth_1.auth)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), order_controller_1.OrderController.getSingleOrder);
router.post("/create-order", (0, auth_1.auth)(user_1.ENUM_USER_ROLE.BUYER), (0, validateRequest_1.validateRequest)(order_validate_1.OrderValidate.createOrderZodSchema), order_controller_1.OrderController.createOrder);
router.get("/", (0, auth_1.auth)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), order_controller_1.OrderController.getAllOrders);
exports.OrderRoutes = router;
