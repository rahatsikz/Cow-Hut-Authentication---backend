import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import httpStatus from "http-status";
import { UserService } from "./user.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved Successfully",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved Successfully",
    data: result,
  });
});

const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updateUserData } = req.body;

  const result = await UserService.updateSingleUser(id, updateUserData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated Successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.deleteUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted Successfully",
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteUser,
};
