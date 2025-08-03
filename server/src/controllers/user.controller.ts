import { NOT_FOUND } from "../constants/http";
import { CreateUserRequest } from "../interfaces/requests/user";
import userModel from "../models/user.model";
import { updatePasswordSchema, updateUserSchema } from "../schemas/user.schema";
import { updatePassword, updateUserProfile } from "../services/user.service";
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

export const updatePasswordHandler = catchErrors(async (req, res) => {
  const { userId } = req.user;
  const { currentPassword, newPassword } = req.body;

  updatePasswordSchema.parse({
    currentPassword,
    newPassword,
  });

  const response = await updatePassword(userId, currentPassword, newPassword);

  return res.status(200).json(response.omitPassword());
});
