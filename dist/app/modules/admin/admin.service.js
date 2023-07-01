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
exports.AdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_model_1 = require("./admin.model");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdAdmin = yield admin_model_1.Admin.create(payload);
    return createdAdmin;
});
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const admin = new admin_model_1.Admin();
    const isAdminExists = yield admin.isAdminExists(phoneNumber);
    if (!isAdminExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Admin not found");
    }
    if (isAdminExists.password &&
        !(yield admin.isPasswordMatched(password, isAdminExists.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password not matched");
    }
    const { _id, role } = isAdminExists;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid refresh Token");
    }
    const { _id } = verifiedToken;
    const isAdminExists = yield admin_model_1.Admin.findOne({ _id });
    if (!isAdminExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Admin not found");
    }
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        _id: isAdminExists._id,
        role: isAdminExists.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const getMyProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // const userRole = user.role;
    const userId = user._id;
    // console.log(userId);
    const result = yield admin_model_1.Admin.findById(userId);
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
    const result = yield admin_model_1.Admin.findByIdAndUpdate(userId, userDataUpdate, {
        new: true,
    });
    return result;
});
exports.AdminService = {
    createAdmin,
    loginAdmin,
    refreshToken,
    getMyProfile,
    updateMyProfile,
};
