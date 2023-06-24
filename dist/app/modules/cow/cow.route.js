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
const router = express_1.default.Router();
router.get("/:id", cow_controller_1.CowController.getSingleCow);
router.patch("/:id", (0, validateRequest_1.validateRequest)(cow_validate_1.CowValidate.updateCowZodSchema), cow_controller_1.CowController.updateSingleCow);
router.delete("/:id", cow_controller_1.CowController.deleteCow);
router.post("/create-cow", (0, validateRequest_1.validateRequest)(cow_validate_1.CowValidate.createCowZodSchema), cow_controller_1.CowController.createCow);
router.get("/", cow_controller_1.CowController.getAllCows);
exports.CowRoutes = router;
