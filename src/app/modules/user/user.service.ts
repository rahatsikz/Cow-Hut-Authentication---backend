import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

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

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteUser,
};
