import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Cow } from "../cow/cow.model";
import { User } from "../user/user.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import mongoose from "mongoose";
import { Label } from "../cow/cow.constant";

const createOrder = async (payload: IOrder) => {
  //   const result = await Order.create(payload);
  //   return result;

  const OrderedCow = await Cow.findById(payload.cow);
  const cowBuyer = await User.findById(payload.buyer);

  if (cowBuyer?.role !== "buyer") {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "You are a seller not buyer");
  }

  if (cowBuyer!.budget <= OrderedCow!.price) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      "Not got enough money to buy the desired cow"
    );
  }

  if (OrderedCow?.label === Label.SoldOut) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, "This Cow is already sold");
  }

  const session = await mongoose.startSession();

  let orderData = null;

  try {
    session.startTransaction();

    if (OrderedCow) {
      OrderedCow.label = Label.SoldOut;
    }

    const newOrderCow = await Cow.create([OrderedCow], {
      session,
    });

    if (cowBuyer?.budget && newOrderCow[0].price) {
      cowBuyer.budget = cowBuyer.budget - newOrderCow[0].price;
    }

    const newOrderBuyer = await User.create([cowBuyer], { session });

    const cowSeller = await User.findById(newOrderCow[0].seller);

    if (cowSeller) {
      cowSeller.income = cowSeller.income + newOrderCow[0].price;
    }

    const newOrderSeller = await User.create([cowSeller], { session });

    const order: IOrder = {
      cow: newOrderCow[0]._id,
      buyer: newOrderBuyer[0]._id,
    };

    const newOrder = await Order.create([order], { session });

    if (!newOrder.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to Order Cow");
    }

    orderData = newOrder[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (orderData) {
    orderData = await Order.findOne({ _id: orderData._id }).populate([
      {
        path: "cow",
      },
      {
        path: "buyer",
      },
    ]);
  }

  return orderData;
};

const getAllOrders = async (): Promise<IOrder[]> => {
  const result = await Order.find({}).populate([
    {
      path: "cow",
    },
    {
      path: "buyer",
    },
  ]);
  return result;
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
