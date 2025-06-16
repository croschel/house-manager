import { NOT_FOUND } from "../constants/http";
import userModel from "../models/user.model";
import appAssert from "../utils/app-assert";
import catchErrors from "../utils/catchErrors";

export const getUserHandler = catchErrors(async (req, res) => {
  const user = await userModel.findById(req.user.userId);
  appAssert(user, NOT_FOUND, "User not found");
  return res.status(200).json(user.omitPassword());
});
