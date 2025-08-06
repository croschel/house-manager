import { Request, Response, NextFunction } from "express";
import * as authController from "../../controllers/auth.controller";
import * as authService from "../../services/auth.service";
import SessionModel from "../../models/session.model";
import { loginSchema, registerSchema } from "../../schemas/auth.schemas";
import appAssert from "../../utils/app-assert";
import { verifyToken } from "../../utils/jwt";
import {
  setAuthCookies,
  clearAuthCookies,
  getAccessTokenCookieOptions,
} from "../../utils/cookies";

jest.mock("../../services/auth.service");
jest.mock("../../models/session.model");
jest.mock("../../schemas/auth.schemas");
jest.mock("../../utils/app-assert");
jest.mock("../../utils/jwt");
jest.mock("../../utils/cookies");

describe("Auth Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockReq = {
      body: {},
      headers: {},
      cookies: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      cookie: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("registerHandler", () => {
    it("should register a new user successfully", async () => {
      const requestData = {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
        userAgent: "test-agent",
      };

      const mockUser = {
        _id: "user123",
        name: "Test User",
        email: "test@example.com",
      };

      mockReq.body = requestData;
      mockReq.headers = { "user-agent": "test-agent" };

      (registerSchema.parse as jest.Mock).mockReturnValue({
        ...requestData,
        userAgent: "test-agent",
      });
      (authService.createAccount as jest.Mock).mockResolvedValue({
        accessToken: "access-token",
        refreshToken: "refresh-token",
        user: mockUser,
      });
      (setAuthCookies as jest.Mock).mockReturnValue(mockRes);

      await authController.registerHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(registerSchema.parse).toHaveBeenCalledWith({
        ...requestData,
        userAgent: "test-agent",
      });
      expect(authService.createAccount).toHaveBeenCalledWith({
        ...requestData,
        userAgent: "test-agent",
      });
      expect(setAuthCookies).toHaveBeenCalledWith(
        mockRes,
        "access-token",
        "refresh-token"
      );
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });
  });

  describe("loginHandler", () => {
    it("should login user successfully", async () => {
      const loginData = {
        email: "test@example.com",
        password: "password123",
        userAgent: "test-agent",
      };

      mockReq.body = loginData;
      mockReq.headers = { "user-agent": "test-agent" };

      (loginSchema.parse as jest.Mock).mockReturnValue({
        ...loginData,
        userAgent: "test-agent",
      });
      (authService.loginUser as jest.Mock).mockResolvedValue({
        accessToken: "access-token",
        refreshToken: "refresh-token",
      });
      (setAuthCookies as jest.Mock).mockReturnValue(mockRes);

      await authController.loginHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(loginSchema.parse).toHaveBeenCalledWith({
        ...loginData,
        userAgent: "test-agent",
      });
      expect(authService.loginUser).toHaveBeenCalledWith({
        ...loginData,
        userAgent: "test-agent",
      });
      expect(setAuthCookies).toHaveBeenCalledWith(
        mockRes,
        "access-token",
        "refresh-token"
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Login successful",
      });
    });
  });

  describe("logoutHandler", () => {
    it("should logout user successfully", async () => {
      const mockPayload = { sessionId: "session123", userId: "user123" };

      mockReq.cookies = { accessToken: "access-token" };

      (verifyToken as jest.Mock).mockReturnValue({ payload: mockPayload });
      (SessionModel.findByIdAndDelete as jest.Mock).mockResolvedValue(true);
      (clearAuthCookies as jest.Mock).mockReturnValue(mockRes);

      await authController.logoutHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(verifyToken).toHaveBeenCalledWith("access-token");
      expect(SessionModel.findByIdAndDelete).toHaveBeenCalledWith("session123");
      expect(clearAuthCookies).toHaveBeenCalledWith(mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Logout successful",
      });
    });

    it("should logout successfully even without valid token", async () => {
      mockReq.cookies = { accessToken: "invalid-token" };

      (verifyToken as jest.Mock).mockReturnValue({ payload: null });
      (clearAuthCookies as jest.Mock).mockReturnValue(mockRes);

      await authController.logoutHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(verifyToken).toHaveBeenCalledWith("invalid-token");
      expect(SessionModel.findByIdAndDelete).not.toHaveBeenCalled();
      expect(clearAuthCookies).toHaveBeenCalledWith(mockRes);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Logout successful",
      });
    });
  });

  describe("refreshHandler", () => {
    it("should refresh access token successfully", async () => {
      mockReq.cookies = { refreshToken: "refresh-token" };

      (authService.refreshUserAccessToken as jest.Mock).mockResolvedValue({
        accessToken: "new-access-token",
        newRefreshToken: undefined,
      });
      (getAccessTokenCookieOptions as jest.Mock).mockReturnValue({});

      await authController.refreshHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(appAssert).toHaveBeenCalledWith(
        "refresh-token",
        expect.anything(),
        "No refresh token provided"
      );
      expect(authService.refreshUserAccessToken).toHaveBeenCalledWith(
        "refresh-token"
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.cookie).toHaveBeenCalledWith(
        "accessToken",
        "new-access-token",
        {}
      );
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Refresh token successfully refreshed",
      });
    });

    it("should set new refresh token when provided", async () => {
      mockReq.cookies = { refreshToken: "refresh-token" };

      (authService.refreshUserAccessToken as jest.Mock).mockResolvedValue({
        accessToken: "new-access-token",
        newRefreshToken: "new-refresh-token",
      });
      (getAccessTokenCookieOptions as jest.Mock).mockReturnValue({});

      await authController.refreshHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(mockRes.cookie).toHaveBeenCalledWith(
        "refreshToken",
        "new-refresh-token",
        {}
      );
      expect(mockRes.cookie).toHaveBeenCalledWith(
        "accessToken",
        "new-access-token",
        {}
      );
    });

    it("should throw if no refresh token provided", async () => {
      mockReq.cookies = {};

      (appAssert as jest.Mock).mockImplementationOnce(
        (value, status, message) => {
          if (!value) throw new Error(message);
        }
      );

      await authController.refreshHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(appAssert).toHaveBeenCalledWith(
        undefined,
        expect.anything(),
        "No refresh token provided"
      );
      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
      const error = mockNext.mock.calls[0][0] as unknown as Error;
      expect(error.message).toBe("No refresh token provided");
    });
  });
});
