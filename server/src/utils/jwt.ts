import jwt, { SignOptions } from "jsonwebtoken";
import { SessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import { ENV } from "../constants/environment";

export type RefreshTokenPayload = {
  sessionId: SessionDocument["_id"];
};

export type AccessTokenPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};

export type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ["user"],
};

export const accessTokenOptions: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: ENV.JWT_SECRET,
};

export const refreshTokenOptions: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: ENV.JWT_REFRESH_SECRET,
};

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret
) => {
  const { secret, ...rest } = options || {};
  return jwt.sign(payload, secret ?? "", {
    ...defaults,
    ...rest,
  });
};
