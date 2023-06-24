"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidate = void 0;
const zod_1 = require("zod");
const user_constant_1 = require("./user.constant");
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .object({
            firstName: zod_1.z.string().optional(),
            lastName: zod_1.z.string().optional(),
        })
            .optional(),
        password: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string().optional(),
        role: zod_1.z.enum([...user_constant_1.UserRole]).optional(),
        address: zod_1.z.string().optional(),
        budget: zod_1.z.number().min(0).optional(),
        income: zod_1.z.number().min(0).optional(),
    }),
});
exports.UserValidate = {
    updateUserZodSchema,
};
