import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ILoginUser, IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const createUser = async (payload: IUser): Promise<IUser> => {
  const createdUser = await User.create(payload);
  return createdUser;
};

const loginUser = async (payload: ILoginUser) => {
  const { phoneNumber, password } = payload;

  const user = new User();

  const isUserExists = await user.isUserExists(phoneNumber);

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  if (
    isUserExists.password &&
    !(await user.isPasswordMatched(password, isUserExists.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password not matched");
  }

  const { _id, role } = isUserExists;
  // console.log(_id, role);

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

export const AuthService = {
  createUser,
  loginUser,
};
