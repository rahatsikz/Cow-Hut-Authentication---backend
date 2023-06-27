import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IAdmin, ILoginAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

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

  const { _id, role } = isAdminExists;
  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const AdminService = {
  createAdmin,
  loginAdmin,
};
