import ExpenseModel from "../models/expense.model";
import * as expenseService from "../services/expense.service";
import appAssert from "../utils/app-assert";
import { CreateExpenseRequest } from "../interfaces/requests/expenses";

jest.mock("../models/expense.model");
jest.mock("../utils/app-assert");

describe("Expense Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getExpenseList", () => {
    it("should return all expenses when no date range is provided", async () => {
      const accountId = "account123";
      const mockExpenses = [
        { _id: "expense1", name: "Test Expense 1", accountId },
        { _id: "expense2", name: "Test Expense 2", accountId },
      ];

      (ExpenseModel.find as jest.Mock).mockResolvedValue(mockExpenses);

      const result = await expenseService.getExpenseList(
        accountId,
        null as any
      );

      expect(ExpenseModel.find).toHaveBeenCalledWith({ accountId });
      expect(result).toEqual(mockExpenses);
    });

    it("should return expenses within date range", async () => {
      const accountId = "account123";
      const fromDate = new Date("2024-01-01");
      const toDate = new Date("2024-01-31");
      const mockExpenses = [
        {
          _id: "expense1",
          name: "Test Expense 1",
          accountId,
          date: "2024-01-15",
        },
      ];

      (ExpenseModel.find as jest.Mock).mockResolvedValue(mockExpenses);

      const result = await expenseService.getExpenseList(
        accountId,
        fromDate,
        toDate
      );

      expect(ExpenseModel.find).toHaveBeenCalledWith({
        accountId,
        date: {
          $gte: fromDate.toISOString(),
          $lte: toDate.toISOString(),
        },
      });
      expect(result).toEqual(mockExpenses);
    });

    it("should use current date as toDate when only fromDate is provided", async () => {
      const accountId = "account123";
      const fromDate = new Date("2024-01-01");
      const mockExpenses = [
        { _id: "expense1", name: "Test Expense 1", accountId },
      ];

      (ExpenseModel.find as jest.Mock).mockResolvedValue(mockExpenses);

      const result = await expenseService.getExpenseList(accountId, fromDate);

      expect(ExpenseModel.find).toHaveBeenCalledWith({
        accountId,
        date: {
          $gte: fromDate.toISOString(),
          $lte: expect.any(String),
        },
      });
      expect(result).toEqual(mockExpenses);
    });

    it("should return empty array when no expenses found", async () => {
      const accountId = "account123";
      const fromDate = new Date("2024-01-01");

      (ExpenseModel.find as jest.Mock).mockResolvedValue(null);

      const result = await expenseService.getExpenseList(accountId, fromDate);

      expect(result).toEqual([]);
    });
  });

  describe("createExpense", () => {
    it("should create a new expense successfully", async () => {
      const newExpense: CreateExpenseRequest = {
        name: "Test Expense",
        ownerId: "owner123",
        accountId: "account123",
        category: "food",
        type: "expense",
        value: 100.5,
        date: new Date("2024-01-15"),
        local: "Supermarket",
        isFixedExpense: false,
      };

      const mockCreatedExpense = { _id: "expense123", ...newExpense };

      (ExpenseModel.create as jest.Mock).mockResolvedValue(mockCreatedExpense);

      const result = await expenseService.createExpense(newExpense);

      expect(ExpenseModel.create).toHaveBeenCalledWith(newExpense);
      expect(result).toEqual(mockCreatedExpense);
    });
  });

  describe("updateExpense", () => {
    it("should update expense successfully", async () => {
      const expenseId = "expense123";
      const updatedExpense: CreateExpenseRequest = {
        name: "Updated Expense",
        ownerId: "owner123",
        accountId: "account123",
        category: "transport",
        type: "expense",
        value: 200.75,
      };

      const mockUpdatedExpense = { _id: expenseId, ...updatedExpense };
      const mockPopulate = jest.fn().mockResolvedValue(mockUpdatedExpense);

      (ExpenseModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
        populate: mockPopulate,
      });

      const result = await expenseService.updateExpense(
        expenseId,
        updatedExpense
      );

      expect(ExpenseModel.findByIdAndUpdate).toHaveBeenCalledWith(
        expenseId,
        updatedExpense,
        { new: true }
      );
      expect(mockPopulate).toHaveBeenCalledWith("ownerId");
      expect(appAssert).toHaveBeenCalledWith(
        mockUpdatedExpense,
        expect.anything(),
        "Expense not found or update failed"
      );
      expect(result).toEqual(mockUpdatedExpense);
    });

    it("should throw if expense not found", async () => {
      const expenseId = "nonexistent";
      const updatedExpense: CreateExpenseRequest = {
        name: "Updated Expense",
        ownerId: "owner123",
        accountId: "account123",
        category: "transport",
        type: "expense",
        value: 200.75,
      };

      const mockPopulate = jest.fn().mockResolvedValue(null);

      (ExpenseModel.findByIdAndUpdate as jest.Mock).mockReturnValue({
        populate: mockPopulate,
      });
      (appAssert as jest.Mock).mockImplementationOnce(
        (value, status, message) => {
          if (!value) throw new Error(message);
        }
      );

      await expect(
        expenseService.updateExpense(expenseId, updatedExpense)
      ).rejects.toThrow("Expense not found or update failed");
    });
  });

  describe("deleteExpense", () => {
    it("should delete expense successfully", async () => {
      const expenseId = "expense123";
      const mockDeletedExpense = {
        _id: expenseId,
        name: "Test Expense",
        accountId: "account123",
      };

      (ExpenseModel.findByIdAndDelete as jest.Mock).mockResolvedValue(
        mockDeletedExpense
      );

      const result = await expenseService.deleteExpense(expenseId);

      expect(ExpenseModel.findByIdAndDelete).toHaveBeenCalledWith(expenseId);
      expect(appAssert).toHaveBeenCalledWith(
        mockDeletedExpense,
        expect.anything(),
        "Expense not found or delete failed"
      );
      expect(result).toEqual(mockDeletedExpense);
    });

    it("should throw if expense not found for deletion", async () => {
      const expenseId = "nonexistent";

      (ExpenseModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);
      (appAssert as jest.Mock).mockImplementationOnce(
        (value, status, message) => {
          if (!value) throw new Error(message);
        }
      );

      await expect(expenseService.deleteExpense(expenseId)).rejects.toThrow(
        "Expense not found or delete failed"
      );
    });
  });
});
