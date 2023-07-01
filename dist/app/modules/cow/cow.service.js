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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const PaginationHelpers_1 = require("../../../helpers/PaginationHelpers");
const cow_model_1 = require("./cow.model");
const cow_constant_1 = require("./cow.constant");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createCow = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield cow_model_1.Cow.create(payload)).populate("seller");
    return result;
});
const getAllCows = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cow_constant_1.cowSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: "i",
                },
            })),
        });
    }
    const { location } = filterData, price = __rest(filterData, ["location"]);
    const { minPrice, maxPrice } = price;
    let whereCondition = andConditions.length ? { $and: andConditions } : {};
    if (location) {
        whereCondition.location = { $eq: location };
    }
    if (minPrice) {
        whereCondition.price = { $gte: minPrice };
    }
    if (maxPrice) {
        whereCondition.price = Object.assign(Object.assign({}, whereCondition.price), { $lte: maxPrice });
    }
    const count = yield cow_model_1.Cow.countDocuments(whereCondition);
    const { page, limit, skip, sortBy, sortOrder } = PaginationHelpers_1.PaginationHelpers.calculatePagination(paginationOptions);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const result = yield cow_model_1.Cow.find(whereCondition)
        .populate("seller")
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    return {
        meta: {
            page,
            limit,
            count,
        },
        data: result,
    };
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findById(id).populate("seller");
    return result;
});
const updateSingleCow = (id, payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield cow_model_1.Cow.findById(id);
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cow can not be found");
    }
    const userId = user._id;
    // console.log({ userId });
    // console.log(isExists.seller.toString());
    if (userId !== isExists.seller.toString()) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden");
    }
    const result = yield cow_model_1.Cow.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate("seller");
    return result;
});
const deleteCow = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield cow_model_1.Cow.findById(id);
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cow can not be found");
    }
    const userId = user._id;
    // console.log({ userId });
    // console.log(isExists.seller.toString());
    if (userId !== isExists.seller.toString()) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Forbidden");
    }
    const result = yield cow_model_1.Cow.findByIdAndDelete(id);
    return result;
});
exports.CowService = {
    createCow,
    getAllCows,
    getSingleCow,
    updateSingleCow,
    deleteCow,
};
