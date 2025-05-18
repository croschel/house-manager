import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import { VerificationCodeType } from "../constants/verificationCode";
import SessionModel from "../models/session.model";
import userModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import appAssert from "../utils/app-assert";
import { ONE_DAY_MS, oneYearFromNow, thirtyDaysFromNow } from "../utils/date";
import {
  accessTokenOptions,
  refreshTokenOptions,
  RefreshTokenPayload,
  signToken,
  verifyToken,
} from "../utils/jwt";

export type CreateAccountParams = {
  email: string;
  password: string;
  confirmPassword: string;
  userAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  // verify if user already exists
  const existingUser = await userModel.exists({ email: data.email });
  appAssert(!existingUser, CONFLICT, "User already exists");

  // create user
  const user = await userModel.create({
    email: data.email,
    password: data.password,
  });

  // create verification code
  const verificationCode = await VerificationCodeModel.create({
    userId: user._id,
    type: VerificationCodeType.EmailVerification,
    expiresAt: oneYearFromNow(),
  });

  // create session
  const session = await SessionModel.create({
    userId: user._id,
    userAgent: data.userAgent,
  });

  const sessionInfo = { userId: user._id, sessionId: session._id };

  // sign access token & refresh token
  const refreshToken = signToken(sessionInfo, refreshTokenOptions);
  const accessToken = signToken(sessionInfo, accessTokenOptions);

  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

export type LoginParams = {
  email: string;
  password: string;
  userAgent?: string;
};

export const loginUser = async ({
  email,
  password,
  userAgent,
}: LoginParams) => {
  const user = await userModel.findOne({ email });
  appAssert(user, UNAUTHORIZED, "Invalid credentials");
  const isValidPassword = await user.comparePassword(password);
  appAssert(isValidPassword, UNAUTHORIZED, "Invalid credentials");
  const session = await SessionModel.create({
    userId: user._id,
    userAgent,
  });

  const sessionInfo = { userId: user._id, sessionId: session._id };

  // sign access token & refresh token
  const refreshToken = signToken(sessionInfo, refreshTokenOptions);
  const accessToken = signToken(
    { ...sessionInfo, userId: user._id },
    accessTokenOptions
  );
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};

export const refreshUserAccessToken = async (refreshToken: string) => {
  const { payload } = verifyToken<RefreshTokenPayload>(refreshToken, {
    secret: refreshTokenOptions.secret,
  });
  appAssert(payload, UNAUTHORIZED, "Invalid refresh token");

  const session = await SessionModel.findById(payload.sessionId);
  appAssert(
    session && session.expiresAt.getTime() > Date.now(),
    UNAUTHORIZED,
    "Session expired"
  );

  // refresh the session if it expires in the next 24h
  const sessionNeedsRefresh =
    session.expiresAt.getTime() - Date.now() <= ONE_DAY_MS;
  if (sessionNeedsRefresh) {
    session.expiresAt = thirtyDaysFromNow();
    await session.save();
  }

  const newRefreshToken = sessionNeedsRefresh
    ? signToken({ sessionId: session._id }, refreshTokenOptions)
    : undefined;

  const accessToken = signToken(
    {
      userId: session.userId,
      sessionId: session._id,
    },
    accessTokenOptions
  );
  return {
    accessToken,
    newRefreshToken,
  };
};
