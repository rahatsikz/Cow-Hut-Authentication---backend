"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCastError = void 0;
const handleCastError = (err) => {
    const errors = [
        {
            path: err === null || err === void 0 ? void 0 : err.path,
            message: err === null || err === void 0 ? void 0 : err.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Cast Error",
        errorMessages: errors,
    };
};
exports.handleCastError = handleCastError;
