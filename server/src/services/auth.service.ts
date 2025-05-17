import { ENV } from "../constants/environment";
import { CONFLICT, UNAUTHORIZED } from "../constants/http";
import { VerificationCodeType } from "../constants/verificationCode";
import SessionModel from "../models/session.model";
import userModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import appAssert from "../utils/app-assert";
import { oneYearFromNow } from "../utils/date";
import jwt from "jsonwebtoken";

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

  // sign access token & refresh token
  const refreshToken = jwt.sign(
    { userId: user._id, sessionId: session._id },
    ENV.JWT_REFRESH_SECRET,
    {
      expiresIn: "30d",
      audience: ["user"],
    }
  );
  const accessToken = jwt.sign(
    { userId: user._id, sessionId: session._id },
    ENV.JWT_SECRET,
    {
      expiresIn: "15m",
      audience: ["user"],
    }
  );

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
  const refreshToken = jwt.sign(
    { userId: user._id, sessionId: session._id },
    ENV.JWT_REFRESH_SECRET,
    {
      expiresIn: "30d",
      audience: ["user"],
    }
  );
  const accessToken = jwt.sign(
    { userId: user._id, sessionId: session._id },
    ENV.JWT_SECRET,
    {
      expiresIn: "15m",
      audience: ["user"],
    }
  );
  return {
    user: user.omitPassword(),
    accessToken,
    refreshToken,
  };
};
