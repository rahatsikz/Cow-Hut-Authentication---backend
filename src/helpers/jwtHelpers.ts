import { Secret, JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

const createToken = (
  payload: object,
  secret: Secret,
  expireTimes: string
): string => {
  return jwt.sign(payload, secret, { expiresIn: expireTimes });
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
