import { Request, Response, NextFunction } from "express";
import { BAD_REQUEST, UNAUTHORIZED } from "../constants/http";
import { verifyToken } from "../utils/jwt";
import appAssert from "../utils/app-assert";
import userModel from "../models/user.model";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  const { payload } = verifyToken(accessToken);
  appAssert(payload, UNAUTHORIZED, "No AccessToken token provided");

  const ownerIdExist = await userModel.exists({ _id: payload.userId });
  appAssert(ownerIdExist, BAD_REQUEST, "Owner ID does not exist");
  req.user = payload; // Attach payload to req
  next();
};
