"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidate = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "name is required" }),
        age: zod_1.z.number({ required_error: "age is required" }).positive(),
        price: zod_1.z.number({ required_error: "price is required" }).positive(),
        location: zod_1.z.enum([...Object.values(cow_constant_1.Location)], {
            required_error: "location is required",
        }),
        breed: zod_1.z.string({
            required_error: "breed is required",
        }),
        weight: zod_1.z.number({ required_error: "weight is required" }).positive(),
        label: zod_1.z.enum([...Object.values(cow_constant_1.Label)], {
            required_error: "label is required",
        }),
        category: zod_1.z.enum([...Object.values(cow_constant_1.Category)], {
            required_error: "category is required",
        }),
        seller: zod_1.z.string({ required_error: "seller is required" }),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().positive().optional(),
        price: zod_1.z.number().positive().optional(),
        location: zod_1.z
            .enum([...Object.values(cow_constant_1.Location)])
            .optional(),
        breed: zod_1.z.string().optional(),
        weight: zod_1.z.number().positive().optional(),
        label: zod_1.z
            .enum([...Object.values(cow_constant_1.Label)])
            .optional(),
        category: zod_1.z
            .enum([...Object.values(cow_constant_1.Category)])
            .optional(),
        seller: zod_1.z.string().optional(),
    }),
});
exports.CowValidate = {
    createCowZodSchema,
    updateCowZodSchema,
};
