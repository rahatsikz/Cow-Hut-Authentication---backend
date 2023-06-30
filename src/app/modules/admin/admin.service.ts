import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IAdmin, ILoginAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";

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

const refreshToken = async (token: string) => {
  let verifiedToken = null;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh Token");
  }

  const { _id } = verifiedToken;

  const isAdminExists = await Admin.findOne({ _id });
  if (!isAdminExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found");
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      _id: isAdminExists._id,
      role: isAdminExists.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

const getMyProfile = async (user: JwtPayload) => {
  // const userRole = user.role;
  const userId = user._id;
  // console.log(userId);

  const result = await Admin.findById(userId);
  return result;
};

const updateMyProfile = async (user: JwtPayload, payload: IAdmin) => {
  // const userRole = user.role;
  const userId = user._id;
  // console.log(userId);

  const { name, ...userData } = payload;

  if (userData.password) {
    userData.password = await bcrypt.hash(
      userData.password,
      Number(config.salt_rounds)
    );
  }

  const userDataUpdate = { ...userData };

  if (name && Object.keys(name).length) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}`;
      (userDataUpdate as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findByIdAndUpdate(userId, userDataUpdate, {
    new: true,
  });
  return result;
};

export const AdminService = {
  createAdmin,
  loginAdmin,
  refreshToken,
  getMyProfile,
  updateMyProfile,
};
