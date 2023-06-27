import { Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const createToken = (
  payload: object,
  secret: Secret,
  expireTimes: string
): string => {
  return jwt.sign(payload, secret, { expiresIn: expireTimes });
};

export const jwtHelpers = {
  createToken,
};
