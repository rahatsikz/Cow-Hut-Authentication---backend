import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

import ApiError from "./errors/ApiError";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import mongoose from "mongoose";
import httpStatus from "http-status";
import routes from "../src/app/routes/index";

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// const { ValidationError } = mongoose.Error;

// route
app.use("/api/v1", routes);

// test
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  //   throw new ApiError(400, "Error Happened");
  //   next("error ashse");
  //   throw new ValidationError();
  res.status(httpStatus.OK).json({
    statusCode: httpStatus.OK,
    success: true,
    message: "Welcome to Digital Cow Hut",
  });
});

// error handler middleware
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Api not found",
    errorMessages: [{ path: req.originalUrl, message: "Api not found" }],
  });
});

export default app;
