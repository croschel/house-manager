import SessionModel from "../models/session.model";
import userModel from "../models/user.model";
import VerificationCodeModel from "../models/verificationCode.model";
import * as authService from "../services/auth.service";
import appAssert from "../utils/app-assert";
import { signToken, verifyToken } from "../utils/jwt";
import { oneYearFromNow, thirtyDaysFromNow } from "../utils/date";

jest.mock("../models/user.model");
jest.mock("../models/session.model");
jest.mock("../models/verificationCode.model");
jest.mock("../utils/app-assert");
jest.mock("../utils/jwt");
jest.mock("../utils/date");

describe("Auth Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createAccount", () => {
    it("should create a new account successfully", async () => {
      const accountData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
        userAgent: "test-agent",
      };

      const mockUser = {
        _id: "user123",
        omitPassword: jest
          .fn()
          .mockReturnValue({
            _id: "user123",
            name: "Test User",
            email: "test@example.com",
          }),
      };
      const mockSession = { _id: "session123" };
      const mockVerificationCode = { _id: "code123" };

      (userModel.exists as jest.Mock).mockResolvedValue(null);
      (userModel.create as jest.Mock).mockResolvedValue(mockUser);
      (VerificationCodeModel.create as jest.Mock).mockResolvedValue(
        mockVerificationCode
      );
      (SessionModel.create as jest.Mock).mockResolvedValue(mockSession);
      (oneYearFromNow as jest.Mock).mockReturnValue(new Date());
      (signToken as jest.Mock)
        .mockReturnValueOnce("refresh-token")
        .mockReturnValueOnce("access-token");

      const result = await authService.createAccount(accountData);

      expect(userModel.exists).toHaveBeenCalledWith({
        email: accountData.email,
      });
      expect(appAssert).toHaveBeenCalledWith(
        null,
        expect.anything(),
        "User already exists"
      );
      expect(userModel.create).toHaveBeenCalledWith({
        name: accountData.name,
        email: accountData.email,
        password: accountData.password,
      });
      expect(VerificationCodeModel.create).toHaveBeenCalled();
      expect(SessionModel.create).toHaveBeenCalledWith({
        userId: mockUser._id,
        userAgent: accountData.userAgent,
      });
      expect(result).toEqual({
        user: { _id: "user123", name: "Test User", email: "test@example.com" },
        accessToken: "access-token",
        refreshToken: "refresh-token",
      });
    });

    it("should throw if user already exists", async () => {
      const accountData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      };

      (userModel.exists as jest.Mock).mockResolvedValue({
        _id: "existing-user",
      });
      (appAssert as jest.Mock).mockImplementationOnce(
        (value, status, message) => {
          if (value) throw new Error(message);
        }
      );

      await expect(authService.createAccount(accountData)).rejects.toThrow(
        "User already exists"
      );
    });
  });

  describe("loginUser", () => {
    it("should login user successfully", async () => {
      const loginData = {
        email: "test@example.com",
        password: "password123",
        userAgent: "test-agent",
      };

      const mockUser = {
        _id: "user123",
        comparePassword: jest.fn().mockResolvedValue(true),
        omitPassword: jest
          .fn()
          .mockReturnValue({ _id: "user123", email: "test@example.com" }),
      };
      const mockSession = { _id: "session123" };

      (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);
      (SessionModel.create as jest.Mock).mockResolvedValue(mockSession);
      (signToken as jest.Mock)
        .mockReturnValueOnce("refresh-token")
        .mockReturnValueOnce("access-token");

      const result = await authService.loginUser(loginData);

      expect(userModel.findOne).toHaveBeenCalledWith({
        email: loginData.email,
      });
      expect(appAssert).toHaveBeenCalledWith(
        mockUser,
        expect.anything(),
        "Invalid credentials"
      );
      expect(mockUser.comparePassword).toHaveBeenCalledWith(loginData.password);
      expect(appAssert).toHaveBeenCalledWith(
        true,
        expect.anything(),
        "Invalid credentials"
      );
      expect(SessionModel.create).toHaveBeenCalledWith({
        userId: mockUser._id,
        userAgent: loginData.userAgent,
      });
      expect(result).toEqual({
        user: { _id: "user123", email: "test@example.com" },
        accessToken: "access-token",
        refreshToken: "refresh-token",
      });
    });

    it("should throw if user not found", async () => {
      const loginData = {
        email: "test@example.com",
        password: "password123",
      };

      (userModel.findOne as jest.Mock).mockResolvedValue(null);
      (appAssert as jest.Mock).mockImplementationOnce(
        (value, status, message) => {
          if (!value) throw new Error(message);
        }
      );

      await expect(authService.loginUser(loginData)).rejects.toThrow(
        "Invalid credentials"
      );
    });

    it("should throw if password is invalid", async () => {
      const loginData = {
        email: "test@example.com",
        password: "wrongpassword",
      };

      const mockUser = {
        comparePassword: jest.fn().mockResolvedValue(false),
      };

      (userModel.findOne as jest.Mock).mockResolvedValue(mockUser);
      (appAssert as jest.Mock)
        .mockImplementationOnce(() => {}) // user exists, do nothing
        .mockImplementationOnce((value, status, message) => {
          if (!value) throw new Error(message);
        });

      await expect(authService.loginUser(loginData)).rejects.toThrow(
        "Invalid credentials"
      );
    });
  });

  describe("refreshUserAccessToken", () => {
    it("should refresh access token successfully", async () => {
      const refreshToken = "valid-refresh-token";
      const mockPayload = { sessionId: "session123", userId: "user123" };
      const mockSession = {
        _id: "session123",
        userId: "user123",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
        save: jest.fn(),
      };

      (verifyToken as jest.Mock).mockReturnValue({ payload: mockPayload });
      (SessionModel.findById as jest.Mock).mockResolvedValue(mockSession);
      (signToken as jest.Mock).mockReturnValue("new-access-token");

      const result = await authService.refreshUserAccessToken(refreshToken);

      expect(verifyToken).toHaveBeenCalledWith(refreshToken, expect.anything());
      expect(appAssert).toHaveBeenCalledWith(
        mockPayload,
        expect.anything(),
        "Invalid refresh token"
      );
      expect(SessionModel.findById).toHaveBeenCalledWith(mockPayload.sessionId);
      expect(appAssert).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        "Session expired"
      );
      expect(result).toEqual({
        accessToken: "new-access-token",
        newRefreshToken: undefined,
      });
    });

    it("should refresh session if it expires soon", async () => {
      const refreshToken = "valid-refresh-token";
      const mockPayload = { sessionId: "session123", userId: "user123" };
      const mockSession = {
        _id: "session123",
        userId: "user123",
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 hours from now (less than 24h)
        save: jest.fn(),
      };

      (verifyToken as jest.Mock).mockReturnValue({ payload: mockPayload });
      (SessionModel.findById as jest.Mock).mockResolvedValue(mockSession);
      (thirtyDaysFromNow as jest.Mock).mockReturnValue(
        new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
      );
      (signToken as jest.Mock)
        .mockReturnValueOnce("new-refresh-token")
        .mockReturnValueOnce("new-access-token");

      const result = await authService.refreshUserAccessToken(refreshToken);

      expect(mockSession.save).toHaveBeenCalled();
      expect(result).toEqual({
        accessToken: "new-access-token",
        newRefreshToken: "new-refresh-token",
      });
    });

    it("should throw if refresh token is invalid", async () => {
      const refreshToken = "invalid-refresh-token";

      (verifyToken as jest.Mock).mockReturnValue({ payload: null });
      (appAssert as jest.Mock).mockImplementationOnce(
        (value, status, message) => {
          if (!value) throw new Error(message);
        }
      );

      await expect(
        authService.refreshUserAccessToken(refreshToken)
      ).rejects.toThrow("Invalid refresh token");
    });

    it("should throw if session is expired", async () => {
      const refreshToken = "valid-refresh-token";
      const mockPayload = { sessionId: "session123" };
      const mockSession = {
        _id: "session123",
        expiresAt: new Date(Date.now() - 1000), // expired
      };

      (verifyToken as jest.Mock).mockReturnValue({ payload: mockPayload });
      (SessionModel.findById as jest.Mock).mockResolvedValue(mockSession);
      (appAssert as jest.Mock)
        .mockImplementationOnce(() => {}) // payload exists, do nothing
        .mockImplementationOnce((value, status, message) => {
          if (!value) throw new Error(message);
        });

      await expect(
        authService.refreshUserAccessToken(refreshToken)
      ).rejects.toThrow("Session expired");
    });
  });
});
