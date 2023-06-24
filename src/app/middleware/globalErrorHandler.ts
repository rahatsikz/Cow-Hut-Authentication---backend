import { ErrorRequestHandler } from "express";
import config from "../../config/index";
import { IGenericErrorMessage } from "../../interface/IGenericErrorMessage";
import ApiError from "../../errors/ApiError";
import { handleValidationError } from "../../errors/handleValidationError";
import { ZodError } from "zod";
import { handleZodError } from "../../errors/handleZodError";
import { handleCastError } from "../../errors/handleCastError";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  let statusCode = 500;
  let message = "Something Went Wrong";
  let errorMessages: IGenericErrorMessage[] = [];

  if (err.name === "ValidationError") {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ZodError) {
    // console.log(err);
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err.name === "CastError ") {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ApiError) {
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
  } else if (err instanceof Error) {
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
    stack: err?.stack,
  });
};
