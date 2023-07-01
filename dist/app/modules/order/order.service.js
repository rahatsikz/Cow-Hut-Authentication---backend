"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const order_model_1 = require("./order.model");
const mongoose_1 = __importDefault(require("mongoose"));
const cow_constant_1 = require("../cow/cow.constant");
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //   const result = await Order.create(payload);
    //   return result;
    const OrderedCow = yield cow_model_1.Cow.findById(payload.cow);
    const cowBuyer = yield user_model_1.User.findById(payload.buyer);
    if ((cowBuyer === null || cowBuyer === void 0 ? void 0 : cowBuyer.role) !== "buyer") {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "You are a seller not buyer");
    }
    if (cowBuyer.budget <= OrderedCow.price) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Not got enough money to buy the desired cow");
    }
    if ((OrderedCow === null || OrderedCow === void 0 ? void 0 : OrderedCow.label) === cow_constant_1.Label.SoldOut) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "This Cow is already sold");
    }
    const session = yield mongoose_1.default.startSession();
    let orderData = null;
    try {
        session.startTransaction();
        if (OrderedCow) {
            OrderedCow.label = cow_constant_1.Label.SoldOut;
        }
        const newOrderCow = yield cow_model_1.Cow.create([OrderedCow], {
            session,
        });
        if ((cowBuyer === null || cowBuyer === void 0 ? void 0 : cowBuyer.budget) && newOrderCow[0].price) {
            cowBuyer.budget = cowBuyer.budget - newOrderCow[0].price;
        }
        const newOrderBuyer = yield user_model_1.User.create([cowBuyer], { session });
        const cowSeller = yield user_model_1.User.findById(newOrderCow[0].seller);
        if (cowSeller) {
            cowSeller.income = cowSeller.income + newOrderCow[0].price;
        }
        const newOrderSeller = yield user_model_1.User.create([cowSeller], { session });
        const order = {
            cow: newOrderCow[0]._id,
            buyer: newOrderBuyer[0]._id,
        };
        const newOrder = yield order_model_1.Order.create([order], { session });
        if (!newOrder.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to Order Cow");
        }
        orderData = newOrder[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (orderData) {
        orderData = yield order_model_1.Order.findOne({ _id: orderData._id }).populate([
            {
                path: "cow",
            },
            {
                path: "buyer",
            },
        ]);
    }
    return orderData;
});
const getAllOrders = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let findConditions = {};
    if (user.role === "buyer") {
        findConditions = { buyer: user._id };
    }
    else if (user.role === "admin") {
        findConditions = {};
    }
    else if (user.role === "seller") {
        const cows = yield cow_model_1.Cow.find({ seller: user._id });
        const cowIds = cows.map((cow) => cow._id);
        findConditions = { cow: { $in: cowIds } };
    }
    const result = yield order_model_1.Order.find(findConditions).populate([
        {
            path: "cow",
        },
        {
            path: "buyer",
        },
    ]);
    return result;
});
const getSingleOrder = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield order_model_1.Order.findById(id);
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Order can not be found");
    }
    const userId = user._id;
    const userRole = user.role;
    if (userRole === "buyer" && userId !== isExists.buyer.toString()) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden");
    }
    const OrderedCow = yield cow_model_1.Cow.findOne({ _id: isExists.cow });
    console.log(OrderedCow === null || OrderedCow === void 0 ? void 0 : OrderedCow.seller.toString());
    if (userRole === "seller" && userId !== (OrderedCow === null || OrderedCow === void 0 ? void 0 : OrderedCow.seller.toString())) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden");
    }
    const result = yield order_model_1.Order.findById(id).populate([
        {
            path: "cow",
        },
        {
            path: "buyer",
        },
    ]);
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrder,
};
