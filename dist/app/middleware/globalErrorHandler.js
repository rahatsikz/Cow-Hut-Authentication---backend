"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const handleValidationError_1 = require("../../errors/handleValidationError");
const zod_1 = require("zod");
const handleZodError_1 = require("../../errors/handleZodError");
const handleCastError_1 = require("../../errors/handleCastError");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something Went Wrong";
    let errorMessages = [];
    if (err.name === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.handleValidationError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (err instanceof zod_1.ZodError) {
        // console.log(err);
        const simplifiedError = (0, handleZodError_1.handleZodError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (err.name === "CastError ") {
        const simplifiedError = (0, handleCastError_1.handleCastError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessages = simplifiedError.errorMessages;
    }
    else if (err instanceof ApiError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorMessages = err.message
            ? [
                {
                    path: "",
                    message: err.message,
                },
            ]
            : [];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorMessages = err.message
            ? [
                {
                    path: "",
                    message: err.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        errorMessages: errorMessages,
        stack: err === null || err === void 0 ? void 0 : err.stack,
    });
};
exports.globalErrorHandler = globalErrorHandler;
