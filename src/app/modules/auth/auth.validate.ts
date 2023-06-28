import { z } from "zod";
import { UserRole } from "../user/user.constant";

const createUserZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({ required_error: "First name is required" }),
      lastName: z.string({ required_error: "Last name is required" }),
    }),
    password: z.string({ required_error: "Password is required" }),
    phoneNumber: z.string({ required_error: "Phone number is required" }),
    role: z.enum([...UserRole] as [string, ...string[]], {
      required_error: "User role is required",
    }),
    address: z.string({ required_error: "Address is required" }),
    budget: z.number({ required_error: "Budget is required" }).min(0, {
      message: "Budget must be a positive number",
    }),
    income: z.number({ required_error: "Income is required" }).min(0, {
      message: "Income must be a positive number",
    }),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: "Phone number is required" }),
    password: z.string({ required_error: "password is required" }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "refresh Token is required",
    }),
  }),
});

export const AuthValidate = {
  createUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
};
