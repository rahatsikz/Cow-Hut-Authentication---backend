import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IAdmin } from "./admin.interface";
import { AdminService } from "./admin.service";
import config from "../../../config";
import { AuthenticatedRequest } from "../../middleware/auth";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...admin } = req.body;

  const result = await AdminService.createAdmin(admin);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin created Successfully",
    data: result,
  });
});

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AdminService.loginAdmin(loginData);

  const { refreshToken, ...others } = result;

  const cookieOption = {
    secure: config.env === "Production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOption);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin logged in Successfully",
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AdminService.refreshToken(refreshToken);

  const cookieOption = {
    secure: config.env === "Production",
    httpOnly: true,
  };

  res.cookie("refreshToken", refreshToken, cookieOption);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New access token generated successfully !",
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const { user } = req as AuthenticatedRequest;

  // console.log({ user });

  const result = await AdminService.getMyProfile(user);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin's information retrieved successfully",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const { user } = req as AuthenticatedRequest;
  const { ...updateData } = req.body;

  const result = await AdminService.updateMyProfile(user, updateData);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin's information updated successfully",
    data: result,
  });
});

export const AdminController = {
  createAdmin,
  loginAdmin,
  refreshToken,
  getMyProfile,
  updateMyProfile,
};
