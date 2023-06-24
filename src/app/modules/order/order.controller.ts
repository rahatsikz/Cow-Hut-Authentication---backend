import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { OrderService } from "./order.service";
import { sendResponse } from "../../../shared/sendResponse";
import { IOrder } from "./order.interface";
import httpStatus from "http-status";

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

export const OrderController = {
  createOrder,
  getAllOrders,
};
