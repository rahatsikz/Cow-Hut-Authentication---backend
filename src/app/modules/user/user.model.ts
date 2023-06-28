import { Schema, model } from "mongoose";
import { UserRole } from "./user.constant";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const userSchema = new Schema<IUser>(
  {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: UserRole,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
});

export const User = model<IUser, UserModel>("User", userSchema);
