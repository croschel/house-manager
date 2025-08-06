import { Request, Response, NextFunction } from "express";
import * as userController from "../../controllers/user.controller";
import * as userService from "../../services/user.service";
import userModel from "../../models/user.model";
import {
  updatePasswordSchema,
  updateUserSchema,
} from "../../schemas/user.schema";
import appAssert from "../../utils/app-assert";

jest.mock("../../services/user.service");
jest.mock("../../models/user.model");
jest.mock("../../schemas/user.schema");
jest.mock("../../utils/app-assert");

describe("User Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockReq = {
      body: {},
      user: {
        userId: "user123",
        sessionId: "session123",
        iat: 1234567890,
        exp: 1234567890,
        aud: ["test"],
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserHandler", () => {
    it("should get user successfully", async () => {
      const mockUser = {
        _id: "user123",
        name: "Test User",
        email: "test@example.com",
        omitPassword: jest.fn().mockReturnValue({
          _id: "user123",
          name: "Test User",
          email: "test@example.com",
        }),
      };

      (userModel.findById as jest.Mock).mockResolvedValue(mockUser);

      await userController.getUserHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(userModel.findById).toHaveBeenCalledWith("user123");
      expect(appAssert).toHaveBeenCalledWith(
        mockUser,
        expect.anything(),
        "User not found"
      );
      expect(mockUser.omitPassword).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        _id: "user123",
        name: "Test User",
        email: "test@example.com",
      });
    });

    it("should throw if user not found", async () => {
      (userModel.findById as jest.Mock).mockResolvedValue(null);
      (appAssert as jest.Mock).mockImplementationOnce(
        (value, status, message) => {
          if (!value) throw new Error(message);
        }
      );

      await userController.getUserHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(userModel.findById).toHaveBeenCalledWith("user123");
      expect(appAssert).toHaveBeenCalledWith(
        null,
        expect.anything(),
        "User not found"
      );
      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      const error = mockNext.mock.calls[0][0] as unknown as Error;
      expect(error.message).toBe("User not found");
    });
  });

  describe("updateUserHandler", () => {
    it("should update user successfully", async () => {
      const updateData = {
        name: "Updated User",
        email: "updated@example.com",
      };

      const mockUser = {
        _id: "user123",
        name: "Test User",
        email: "test@example.com",
      };

      const mockUpdatedUser = {
        _id: "user123",
        name: "Updated User",
        email: "updated@example.com",
        omitPassword: jest.fn().mockReturnValue({
          _id: "user123",
          name: "Updated User",
          email: "updated@example.com",
        }),
      };

      mockReq.body = updateData;

      (userModel.findById as jest.Mock).mockResolvedValue(mockUser);
      (updateUserSchema.parse as jest.Mock).mockReturnValue(updateData);
      (userService.updateUserProfile as jest.Mock).mockResolvedValue(
        mockUpdatedUser
      );

      await userController.updateUserHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(userModel.findById).toHaveBeenCalledWith("user123");
      expect(appAssert).toHaveBeenCalledWith(
        mockUser,
        expect.anything(),
        "User not found"
      );
      expect(updateUserSchema.parse).toHaveBeenCalledWith(updateData);
      expect(userService.updateUserProfile).toHaveBeenCalledWith(
        "user123",
        updateData
      );
      expect(mockUpdatedUser.omitPassword).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        _id: "user123",
        name: "Updated User",
        email: "updated@example.com",
      });
    });

    it("should throw if user not found", async () => {
      const updateData = {
        name: "Updated User",
        email: "updated@example.com",
      };

      mockReq.body = updateData;

      (userModel.findById as jest.Mock).mockResolvedValue(null);
      (appAssert as jest.Mock).mockImplementationOnce(
        (value, status, message) => {
          if (!value) throw new Error(message);
        }
      );

      await userController.updateUserHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(userModel.findById).toHaveBeenCalledWith("user123");
      expect(appAssert).toHaveBeenCalledWith(
        null,
        expect.anything(),
        "User not found"
      );
      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      const error = mockNext.mock.calls[0][0] as unknown as Error;
      expect(error.message).toBe("User not found");
    });
  });

  describe("updatePasswordHandler", () => {
    it("should update password successfully", async () => {
      const passwordData = {
        currentPassword: "oldpassword",
        newPassword: "newpassword",
      };

      const mockUpdatedUser = {
        _id: "user123",
        name: "Test User",
        email: "test@example.com",
        omitPassword: jest.fn().mockReturnValue({
          _id: "user123",
          name: "Test User",
          email: "test@example.com",
        }),
      };

      mockReq.body = passwordData;

      (updatePasswordSchema.parse as jest.Mock).mockReturnValue(passwordData);
      (userService.updatePassword as jest.Mock).mockResolvedValue(
        mockUpdatedUser
      );

      await userController.updatePasswordHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(updatePasswordSchema.parse).toHaveBeenCalledWith(passwordData);
      expect(userService.updatePassword).toHaveBeenCalledWith(
        "user123",
        "oldpassword",
        "newpassword"
      );
      expect(mockUpdatedUser.omitPassword).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        _id: "user123",
        name: "Test User",
        email: "test@example.com",
      });
    });
  });
});
