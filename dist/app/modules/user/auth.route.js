"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const validateRequest_1 = require("../../middleware/validateRequest");
const user_validate_1 = require("./user.validate");
const router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.validateRequest)(user_validate_1.UserValidate.createUserZodSchema), user_controller_1.UserController.createUser);
exports.AuthRoutes = router;
