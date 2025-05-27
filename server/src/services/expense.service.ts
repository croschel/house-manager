import { BAD_REQUEST } from "../constants/http";
import { CreateExpenseRequest } from "../interfaces/requests/expenses";
import ExpenseModel from "../models/expense.model";
import userModel from "../models/user.model";
import appAssert from "../utils/app-assert";

export const getExpenseList = async (
  ownerId: string,
  from: Date,
  to?: Date
) => {
  const ownerIdExist = await userModel.exists({ _id: ownerId });
  appAssert(ownerIdExist, BAD_REQUEST, "Owner ID does not exist");

  // Check if date range is provided
  if (!from && !to) {
    const res = await ExpenseModel.find({ ownerId });
    return res;
  }
  const expenses = await ExpenseModel.find({
    ownerId,
    date: {
      $gte: new Date(from).toISOString(),
      $lte:
        to !== undefined
          ? new Date(to).toISOString()
          : new Date().toISOString(),
    },
  });

  // Check if expenses exist
  if (!expenses) {
    return [];
  }

  return expenses;
};

export const createExpense = async (newExpense: CreateExpenseRequest) => {
  return await ExpenseModel.create(newExpense);
};

export const updateExpense = async (
  expenseId: string,
  updatedExpense: CreateExpenseRequest
) => {
  const expense = await ExpenseModel.findByIdAndUpdate(
    expenseId,
    updatedExpense,
    { new: true }
  ).populate("ownerId");

  appAssert(expense, BAD_REQUEST, "Expense not found or update failed");
  return expense;
};

export const deleteExpense = async (expenseId: string) => {
  const expense = await ExpenseModel.findByIdAndDelete(expenseId);

  appAssert(expense, BAD_REQUEST, "Expense not found or delete failed");
  return expense;
};
