import { Request, Response, NextFunction } from "express";
import { BAD_REQUEST, UNAUTHORIZED } from "../constants/http";
import { verifyToken } from "../utils/jwt";
import appAssert from "../utils/app-assert";
import userModel from "../models/user.model";
import AppErrorCode from "../constants/app-error-code";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  const { payload, error } = verifyToken(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    AppErrorCode.InvalidAccessToken
  );

  const ownerIdExist = await userModel.exists({ _id: payload.userId });
  appAssert(ownerIdExist, BAD_REQUEST, "Owner ID does not exist");
  // @ts-ignore
  req.user = payload; // Attach payload to req
  next();
};
