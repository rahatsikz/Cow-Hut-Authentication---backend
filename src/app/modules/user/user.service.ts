import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import { JwtPayload } from "jsonwebtoken";
import { Admin } from "../admin/admin.model";
import { IAdmin } from "../admin/admin.interface";
import config from "../../../config";
import bcrypt from "bcrypt";

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find({});
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const updateSingleUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExists = await User.findById(id);
  if (!isExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User can not be found");
  }
  const { name, ...userData } = payload;

  const userDataUpdate = { ...userData };

  if (name && Object.keys(name).length) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}`;
      (userDataUpdate as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ _id: id }, userDataUpdate, {
    new: true,
  });

  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const getMyProfile = async (user: JwtPayload) => {
  const userRole = user.role;
  const userId = user._id;
  // console.log(userId);

  if (userRole === "admin") {
    const result = await Admin.findById(userId);

    return result;
  } else if (userRole === "seller" || userRole === "buyer") {
    const result = await User.findById(userId);
    return result;
  }
};

const updateMyProfile = async (user: JwtPayload, payload: IUser | IAdmin) => {
  const userRole = user.role;
  const userId = user._id;
  // console.log(userId);

  if (payload.password) {
    payload.password = await bcrypt.hash(
      payload.password,
      Number(config.salt_rounds)
    );
  }

  if (userRole === "admin") {
    const result = await Admin.findByIdAndUpdate(userId, payload, {
      new: true,
    });
    return result;
  } else if (userRole === "seller" || userRole === "buyer") {
    const result = await User.findByIdAndUpdate(userId, payload, {
      new: true,
    });
    return result;
  }
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteUser,
  getMyProfile,
  updateMyProfile,
};
