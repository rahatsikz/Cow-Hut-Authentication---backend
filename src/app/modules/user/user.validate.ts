import { z } from "zod";
import { UserRole } from "./user.constant";

const updateUserZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    password: z.string().optional(),
    phoneNumber: z.string().optional(),
    role: z.enum([...UserRole] as [string, ...string[]]).optional(),
    address: z.string().optional(),
    budget: z.number().min(0).optional(),
    income: z.number().min(0).optional(),
  }),
});

export const UserValidate = {
  updateUserZodSchema,
};
