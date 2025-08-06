import { Request, Response, NextFunction } from "express";
import * as expenseController from "../../controllers/expense.controller";
import * as expenseService from "../../services/expense.service";
import { expenseSchema } from "../../schemas/expense.schemas";

jest.mock("../../services/expense.service");
jest.mock("../../schemas/expense.schemas");

describe("Expense Controller", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockReq = {
      body: {},
      query: {},
      params: {},
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

  describe("getExpensesHandler", () => {
    it("should get expenses successfully", async () => {
      const mockExpenses = [
        { _id: "expense1", name: "Test Expense 1", value: 100 },
        { _id: "expense2", name: "Test Expense 2", value: 200 },
      ];

      mockReq.query = {
        from: "2024-01-01",
        to: "2024-01-31",
      } as any;

      (expenseService.getExpenseList as jest.Mock).mockResolvedValue(
        mockExpenses
      );

      await expenseController.getExpensesHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(expenseService.getExpenseList).toHaveBeenCalledWith(
        "user123",
        "2024-01-01",
        "2024-01-31"
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockExpenses);
    });
  });

  describe("createExpenseHandler", () => {
    it("should create expense successfully", async () => {
      const expenseData = {
        name: "Test Expense",
        category: "food",
        type: "expense",
        value: 100.5,
        date: new Date("2024-01-15"),
        local: "Supermarket",
        isFixedExpense: false,
      };

      const mockCreatedExpense = {
        _id: "expense123",
        ...expenseData,
        ownerId: "user123",
        accountId: "user123",
      };

      mockReq.body = expenseData;

      (expenseSchema.parse as jest.Mock).mockReturnValue({
        ...expenseData,
        ownerId: "user123",
        accountId: "user123",
      });
      (expenseService.createExpense as jest.Mock).mockResolvedValue(
        mockCreatedExpense
      );

      await expenseController.createExpenseHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(expenseSchema.parse).toHaveBeenCalledWith({
        ...expenseData,
        ownerId: "user123",
        accountId: "user123",
      });
      expect(expenseService.createExpense).toHaveBeenCalledWith({
        ...expenseData,
        ownerId: "user123",
        accountId: "user123",
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockCreatedExpense);
    });
  });

  describe("updateExpenseHandler", () => {
    it("should update expense successfully", async () => {
      const expenseId = "expense123";
      const updatedData = {
        name: "Updated Expense",
        category: "transport",
        type: "expense",
        value: 200.75,
      };

      const mockUpdatedExpense = {
        _id: expenseId,
        ...updatedData,
      };

      mockReq.params = { id: expenseId };
      mockReq.body = updatedData;

      (expenseSchema.parse as jest.Mock).mockReturnValue(updatedData);
      (expenseService.updateExpense as jest.Mock).mockResolvedValue(
        mockUpdatedExpense
      );

      await expenseController.updateExpenseHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(expenseSchema.parse).toHaveBeenCalledWith(updatedData);
      expect(expenseService.updateExpense).toHaveBeenCalledWith(
        expenseId,
        updatedData
      );
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedExpense);
    });
  });

  describe("deleteExpenseHandler", () => {
    it("should delete expense successfully", async () => {
      const expenseId = "expense123";

      mockReq.params = { id: expenseId };

      (expenseService.deleteExpense as jest.Mock).mockResolvedValue(true);

      await expenseController.deleteExpenseHandler(
        mockReq as Request,
        mockRes as Response,
        mockNext
      );

      expect(expenseService.deleteExpense).toHaveBeenCalledWith(expenseId);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Expense deleted successfully",
      });
    });
  });
});
