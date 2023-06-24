import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../../shared/sendResponse";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;

  const result = await AuthService.createUser(user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created Successfully",
    data: result,
  });
});

export const AuthController = {
  createUser,
};
