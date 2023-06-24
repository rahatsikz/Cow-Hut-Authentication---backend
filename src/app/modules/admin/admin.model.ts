import { Schema, model } from "mongoose";
import { AdminModel, IAdmin } from "./admin.interface";

const adminSchema = new Schema<IAdmin>(
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
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret, options) {
        delete ret.password;
        return ret;
      },
    },
  }
);

export const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);
