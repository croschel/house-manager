import { CREATED, OK, UNAUTHORIZED } from "../constants/http";
import SessionModel from "../models/session.model";
import { loginSchema, registerSchema } from "../schemas/auth.schemas";
import {
  createAccount,
  loginUser,
  refreshUserAccessToken,
} from "../services/auth.service";
import appAssert from "../utils/app-assert";
import catchErrors from "../utils/catchErrors";
import {
  clearAuthCookies,
  getAccessTokenCookieOptions,
  setAuthCookies,
} from "../utils/cookies";
import { verifyToken } from "../utils/jwt";

export const registerHandler = catchErrors(async (req, res, next) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { accessToken, refreshToken, user } = await createAccount(request);

  return setAuthCookies(res, accessToken, refreshToken)
    .status(CREATED)
    .json({ user });
});

export const loginHandler = catchErrors(async (req, res, next) => {
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { accessToken, refreshToken } = await loginUser(request);
  return setAuthCookies(res, accessToken, refreshToken)
    .status(OK)
    .json({ message: "Login successful" });
});

export const logoutHandler = catchErrors(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const { payload } = verifyToken(accessToken);

  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }

  return clearAuthCookies(res)
    .status(OK)
    .json({ message: "Logout successful" });
});

export const refreshHandler = catchErrors(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken as string | undefined;
  appAssert(refreshToken, UNAUTHORIZED, "No refresh token provided");

  const { accessToken, newRefreshToken } =
    await refreshUserAccessToken(refreshToken);
  console.log("newRefreshToken", newRefreshToken);
  if (newRefreshToken) {
    res.cookie("refreshToken", newRefreshToken, getAccessTokenCookieOptions());
  }

  return res
    .status(OK)
    .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
    .json({
      message: "Refresh token successfully refreshed",
    });
});
