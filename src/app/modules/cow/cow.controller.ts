import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { ICow } from "./cow.interface";
import httpStatus from "http-status";
import { sendResponse } from "../../../shared/sendResponse";
import { CowService } from "./cow.service";
import { pick } from "../../../shared/pick";
import { cowFilterableFields, paginationFields } from "./cow.constant";

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...cow } = req.body;

  const result = await CowService.createCow(cow);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow created Successfully",
    data: result,
  });
});

const getAllCows = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, cowFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await CowService.getAllCows(filters, paginationOptions);
  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cows retrieved Successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.getSingleCow(id);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow retrieved Successfully",
    data: result,
  });
});

const updateSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const { ...updateCowData } = req.body;

  const result = await CowService.updateSingleCow(id, updateCowData);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow updated Successfully",
    data: result,
  });
});

const deleteCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.deleteCow(id);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow deleted Successfully",
    data: result,
  });
});

export const CowController = {
  createCow,
  getAllCows,
  getSingleCow,
  updateSingleCow,
  deleteCow,
};
