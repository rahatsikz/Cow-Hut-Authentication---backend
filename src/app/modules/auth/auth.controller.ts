import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../../shared/sendResponse";
import { IUser } from "../user/user.interface";
import httpStatus from "http-status";
import { UserService } from "../user/user.service";
import config from "../../../config";

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

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);

  const { refreshToken, ...others } = result;

  const cookieOption = {
    secure: config.env === "Production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOption);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in Successfully",
    data: others,
  });
});

export const AuthController = {
  createUser,
  loginUser,
};
