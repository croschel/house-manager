import userModel from "../models/user.model";
import * as userService from "./user.service";
import appAssert from "../utils/app-assert";

jest.mock("../models/user.model");
jest.mock("../utils/app-assert");

describe("User Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("updateUserProfile", () => {
    it("should update and return the user", async () => {
      const userId = "user123";
      const newUser = {
        name: "Test",
        email: "test@test.com",
        password: "pass",
        verified: true,
      };
      const updatedUser = { ...newUser, _id: userId };
      (userModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedUser);

      const result = await userService.updateUserProfile(userId, newUser);
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
        userId,
        newUser,
        { new: true }
      );
      expect(appAssert).toHaveBeenCalledWith(
        updatedUser,
        expect.anything(),
        expect.anything()
      );
      expect(result).toEqual(updatedUser);
    });

    it("should throw if user not found", async () => {
      (userModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);
      const userId = "user123";
      const newUser = {
        name: "Test",
        email: "test@test.com",
        password: "pass",
        verified: true,
      };
      await userService.updateUserProfile(userId, newUser);
      expect(appAssert).toHaveBeenCalledWith(
        null,
        expect.anything(),
        expect.anything()
      );
    });
  });

  describe("updatePassword", () => {
    it("should update password and return user", async () => {
      const userId = "user123";
      const user = {
        comparePassword: jest.fn().mockResolvedValue(true),
        save: jest.fn().mockResolvedValue(undefined),
        password: "old",
      };
      (userModel.findById as jest.Mock).mockResolvedValue(user);

      const result = await userService.updatePassword(
        userId,
        "oldpass",
        "newpass"
      );
      expect(userModel.findById).toHaveBeenCalledWith(userId);
      expect(user.comparePassword).toHaveBeenCalledWith("oldpass");
      expect(user.save).toHaveBeenCalled();
      expect(result).toBe(user);
    });

    it("should throw if user not found", async () => {
      (userModel.findById as jest.Mock).mockResolvedValue(null);
      (appAssert as jest.Mock).mockImplementationOnce((value) => {
        if (!value) throw new Error("User not found");
      });
      await expect(
        userService.updatePassword("user123", "old", "new")
      ).rejects.toThrow("User not found");
    });

    it("should throw if current password is incorrect", async () => {
      (appAssert as jest.Mock)
        .mockImplementationOnce(() => {}) // user exists, do nothing
        .mockImplementationOnce((value) => {
          if (!value) throw new Error("Current password is incorrect");
        });
      const user = {
        comparePassword: jest.fn().mockResolvedValue(false),
        save: jest.fn(),
        password: "old",
      };
      (userModel.findById as jest.Mock).mockResolvedValue(user);
      await expect(
        userService.updatePassword("user123", "wrong", "new")
      ).rejects.toThrow("Current password is incorrect");
      expect(user.save).not.toHaveBeenCalled();
    });
  });
});
