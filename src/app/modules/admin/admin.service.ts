import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IAdmin, ILoginAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const createAdmin = async (payload: IAdmin): Promise<IAdmin> => {
  const createdAdmin = await Admin.create(payload);
  return createdAdmin;
};

const loginAdmin = async (payload: ILoginAdmin) => {
  const { phoneNumber, password } = payload;

  const admin = new Admin();

  const isAdminExists = await admin.isAdminExists(phoneNumber);

  if (!isAdminExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }

  if (
    isAdminExists.password &&
    !(await admin.isPasswordMatched(password, isAdminExists.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password not matched");
  }
};

export const AdminService = {
  createAdmin,
};
