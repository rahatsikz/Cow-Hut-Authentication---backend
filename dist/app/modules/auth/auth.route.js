"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const auth_validate_1 = require("./auth.validate");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post("/signup", (0, validateRequest_1.validateRequest)(auth_validate_1.AuthValidate.createUserZodSchema), auth_controller_1.AuthController.createUser);
router.post("/login", (0, validateRequest_1.validateRequest)(auth_validate_1.AuthValidate.loginZodSchema), auth_controller_1.AuthController.loginUser);
router.post("/refresh-token", (0, validateRequest_1.validateRequest)(auth_validate_1.AuthValidate.refreshTokenZodSchema), auth_controller_1.AuthController.refreshToken);
exports.AuthRoutes = router;
