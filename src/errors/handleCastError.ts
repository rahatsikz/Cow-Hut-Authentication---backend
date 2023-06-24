import mongoose from "mongoose";
import { IGenericErrorMessage } from "../interface/IGenericErrorMessage";
import { IGenericErrorResponse } from "../interface/IGenericErrorResponse";

export const handleCastError = (
  err: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Cast Error",
    errorMessages: errors,
  };
};
