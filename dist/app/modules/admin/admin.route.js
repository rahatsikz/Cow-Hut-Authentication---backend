"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const admin_validate_1 = require("./admin.validate");
const admin_controller_1 = require("./admin.controller");
const user_1 = require("../../../enums/user");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.get("/my-profile", (0, auth_1.auth)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.getMyProfile);
router.patch("/my-profile", (0, auth_1.auth)(user_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.updateMyProfile);
router.post("/create-admin", (0, validateRequest_1.validateRequest)(admin_validate_1.AdminValidate.createAdminZodSchema), admin_controller_1.AdminController.createAdmin);
router.post("/login", (0, validateRequest_1.validateRequest)(admin_validate_1.AdminValidate.loginZodSchema), admin_controller_1.AdminController.loginAdmin);
router.post("/refresh-token", (0, validateRequest_1.validateRequest)(admin_validate_1.AdminValidate.refreshTokenZodSchema), admin_controller_1.AdminController.refreshToken);
exports.AdminRoutes = router;
