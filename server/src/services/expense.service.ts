import { BAD_REQUEST } from "../constants/http";
import { CreateExpenseRequest } from "../interfaces/requests/expenses";
import ExpenseModel from "../models/expense.model";
import userModel from "../models/user.model";
import appAssert from "../utils/app-assert";
import { DateRange } from "../utils/date";

export const getExpenseList = async (
  ownerId: string,
  from: Date,
  to?: Date
) => {
  const ownerIdExist = await userModel.exists({ ownerId });
  appAssert(ownerIdExist, BAD_REQUEST, "Owner ID does not exist");

  // Check if date range is provided
  if (!from && !to) {
    return await ExpenseModel.find({ ownerId }).populate("ownerId");
  }
  const expenses = await ExpenseModel.find({
    ownerId,
    date: {
      $gte: new Date(from),
      $lte: new Date(to ?? ""),
    },
  }).populate("ownerId");

  // Check if expenses exist
  if (!expenses) {
    return [];
  }

  return expenses;
};

export const createExpense = async (newExpense: CreateExpenseRequest) => {
  return await ExpenseModel.create(newExpense);
};
