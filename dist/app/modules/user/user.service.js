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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({});
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    return result;
});
const updateSingleUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield user_model_1.User.findById(id);
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User can not be found");
    }
    const { name } = payload, userData = __rest(payload, ["name"]);
    const userDataUpdate = Object.assign({}, userData);
    if (name && Object.keys(name).length) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            userDataUpdate[nameKey] = name[key];
        });
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, userDataUpdate, {
        new: true,
    });
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete(id);
    return result;
});
const getMyProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // const userRole = user.role;
    const userId = user._id;
    // console.log(userId);
    const result = yield user_model_1.User.findById(userId);
    return result;
});
const updateMyProfile = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const userRole = user.role;
    const userId = user._id;
    // console.log(userId);
    const { name } = payload, userData = __rest(payload, ["name"]);
    if (userData.password) {
        userData.password = yield bcrypt_1.default.hash(userData.password, Number(config_1.default.salt_rounds));
    }
    const userDataUpdate = Object.assign({}, userData);
    if (name && Object.keys(name).length) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            userDataUpdate[nameKey] = name[key];
        });
    }
    const result = yield user_model_1.User.findByIdAndUpdate(userId, userDataUpdate, {
        new: true,
    });
    return result;
});
exports.UserService = {
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteUser,
    getMyProfile,
    updateMyProfile,
};
