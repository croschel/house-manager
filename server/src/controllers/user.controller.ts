import { NOT_FOUND } from "../constants/http";
import { CreateUserRequest } from "../interfaces/requests/user";
import userModel from "../models/user.model";
import { updateUserSchema } from "../schemas/user.schema";
import { updateUserProfile } from "../services/user.service";
import appAssert from "../utils/app-assert";
import catchErrors from "../utils/catchErrors";

export const getUserHandler = catchErrors(async (req, res) => {
  const user = await userModel.findById(req.user.userId);
  appAssert(user, NOT_FOUND, "User not found");
  return res.status(200).json(user.omitPassword());
});

export const updateUserHandler = catchErrors(async (req, res) => {
  const updateUser = req.body as CreateUserRequest;
  const { userId } = req.user;
  const user = await userModel.findById(userId);
  appAssert(user, NOT_FOUND, "User not found");
  updateUserSchema.parse(updateUser);

  const response = await updateUserProfile(userId, updateUser);

  return res.status(200).json(response.omitPassword());
});
