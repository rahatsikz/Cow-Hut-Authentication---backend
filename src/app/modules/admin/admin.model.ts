import { Schema, model } from "mongoose";
import { AdminModel, IAdmin, IAdminMethods } from "./admin.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const adminSchema = new Schema<IAdmin, AdminModel, IAdminMethods>(
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

adminSchema.methods.isAdminExists = async function (phoneNumber: string) {
  return await Admin.findOne({ phoneNumber }, { _id: 1, role: 1, password: 1 });
};

adminSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
) {
  return await bcrypt.compare(givenPassword, savedPassword);
};

adminSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_rounds));
  next();
});

export const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);
