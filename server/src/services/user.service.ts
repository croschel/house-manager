import { BAD_REQUEST } from "../constants/http";
import { CreateUserRequest } from "../interfaces/requests/user";
import userModel from "../models/user.model";
import appAssert from "../utils/app-assert";

export const updateUserProfile = async (
  userId: string,
  newUser: CreateUserRequest
) => {
  const user = await userModel.findByIdAndUpdate(userId, newUser, {
    new: true,
  });

  appAssert(user, BAD_REQUEST, "User not found or update failed");
  return user;
};

export const updatePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  const user = await userModel.findById(userId);
  appAssert(user, BAD_REQUEST, "User not found");
  const isPasswordCorrect = await user.comparePassword(currentPassword);
  appAssert(isPasswordCorrect, BAD_REQUEST, "Current password is incorrect");

  user.password = newPassword;
  await user.save();

  return user;
};
