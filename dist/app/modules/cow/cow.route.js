"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const cow_validate_1 = require("./cow.validate");
const cow_controller_1 = require("./cow.controller");
const auth_1 = require("../../middleware/auth");
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.get("/:id", (0, auth_1.auth)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), cow_controller_1.CowController.getSingleCow);
router.patch("/:id", (0, auth_1.auth)(user_1.ENUM_USER_ROLE.SELLER), (0, validateRequest_1.validateRequest)(cow_validate_1.CowValidate.updateCowZodSchema), cow_controller_1.CowController.updateSingleCow);
router.delete("/:id", (0, auth_1.auth)(user_1.ENUM_USER_ROLE.SELLER), cow_controller_1.CowController.deleteCow);
router.post("/create-cow", (0, auth_1.auth)(user_1.ENUM_USER_ROLE.SELLER), (0, validateRequest_1.validateRequest)(cow_validate_1.CowValidate.createCowZodSchema), cow_controller_1.CowController.createCow);
router.get("/", (0, auth_1.auth)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER), cow_controller_1.CowController.getAllCows);
exports.CowRoutes = router;
