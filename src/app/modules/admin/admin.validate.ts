import { z } from "zod";

const createAdminZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({ required_error: "First name is required" }),
      lastName: z.string({ required_error: "Last name is required" }),
    }),
    password: z.string({ required_error: "Password is required" }),
    phoneNumber: z.string({ required_error: "Phone number is required" }),
    role: z.literal("admin", {
      required_error: "role is required",
    }),
    address: z.string({ required_error: "Address is required" }),
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

export const AdminValidate = {
  createAdminZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
};
