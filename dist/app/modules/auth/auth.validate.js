"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidate = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("../user/user.constant");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({ required_error: "First name is required" }),
            lastName: zod_1.z.string({ required_error: "Last name is required" }),
        }),
        password: zod_1.z.string({ required_error: "Password is required" }),
        phoneNumber: zod_1.z.string({ required_error: "Phone number is required" }),
        role: zod_1.z.enum([...user_constant_1.UserRole], {
            required_error: "User role is required",
        }),
        address: zod_1.z.string({ required_error: "Address is required" }),
        budget: zod_1.z.number({ required_error: "Budget is required" }).min(0, {
            message: "Budget must be a positive number",
        }),
        income: zod_1.z.number({ required_error: "Income is required" }).min(0, {
            message: "Income must be a positive number",
        }),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({ required_error: "Phone number is required" }),
        password: zod_1.z.string({ required_error: "password is required" }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: "refresh Token is required",
        }),
    }),
});
exports.AuthValidate = {
    createUserZodSchema,
    loginZodSchema,
    refreshTokenZodSchema,
};
