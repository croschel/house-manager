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
