import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IAdmin } from "./admin.interface";
import { AdminService } from "./admin.service";

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

export const AdminController = {
  createAdmin,
};
