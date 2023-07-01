"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = require("./app/middleware/globalErrorHandler");
const http_status_1 = __importDefault(require("http-status"));
const index_1 = __importDefault(require("../src/app/routes/index"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// const { ValidationError } = mongoose.Error;
// route
app.use("/api/v1", index_1.default);
// test
app.get("/", (req, res, next) => {
    //   throw new ApiError(400, "Error Happened");
    //   next("error ashse");
    //   throw new ValidationError();
    res.status(http_status_1.default.OK).json({
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Welcome to Digital Cow Hut",
    });
});
// error handler middleware
app.use(globalErrorHandler_1.globalErrorHandler);
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Api not found",
        errorMessages: [{ path: req.originalUrl, message: "Api not found" }],
    });
});
exports.default = app;
