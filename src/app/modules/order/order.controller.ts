import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { OrderService } from "./order.service";
import { sendResponse } from "../../../shared/sendResponse";
import { IOrder } from "./order.interface";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "../../middleware/auth";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...Order } = req.body;

  const result = await OrderService.createOrder(Order);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order created Successfully",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.getAllOrders();

  sendResponse<IOrder[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders retrieved Successfully",
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const { user } = req as AuthenticatedRequest;

  const result = await OrderService.getSingleOrder(id, user);

  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order retrieved Successfully",
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
