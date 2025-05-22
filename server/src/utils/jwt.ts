import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { SessionDocument } from "../models/session.model";
import { UserDocument } from "../models/user.model";
import { ENV } from "../constants/environment";
import { Request } from "express";
import appAssert from "./app-assert";
import { UNAUTHORIZED } from "../constants/http";

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

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  const { secret = ENV.JWT_SECRET, ...rest } = options || {};
  try {
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...rest,
    }) as TPayload;
    return {
      payload,
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
