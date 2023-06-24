import { IGenericErrorMessage } from "../interface/IGenericErrorMessage";
import { IGenericErrorResponse } from "../interface/IGenericErrorResponse";
import { ZodError, ZodIssue } from "zod";

export const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "Zod Error",
    errorMessages: errors,
  };
};
