import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors";
import { BAD_REQUEST, OK, UNAUTHORIZED } from "../constants/http";
import {
  createExpense,
  deleteExpense,
  getExpenseList,
  updateExpense,
} from "../services/expense.service";
import { CreateExpenseRequest } from "../interfaces/requests/expenses";
import { expenseSchema } from "../schemas/expense.schemas";
import appAssert from "../utils/app-assert";
import { verifyToken } from "../utils/jwt";
import { SearchRequest } from "../interfaces/requests/general";
import userModel from "../models/user.model";

export const getExpensesHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { accountId, to, from } = req.query as unknown as SearchRequest;
    const expenses = await getExpenseList(accountId, from, to);
    return res.status(OK).json({ expenses });
  }
);

export const createExpenseHandler = catchErrors(
  async (req: Request, res: Response) => {
    const user = req.user;

    const newExpense: CreateExpenseRequest = {
      ...req.body,
      ownerId: user.userId,
      accountId: user.userId,
    };
    expenseSchema.parse(newExpense);

    const expense = await createExpense(newExpense);
    return res.status(201).json({ expense });
  }
);

export const updateExpenseHandler = catchErrors(
  async (req: Request, res: Response) => {
    const expenseId = req.params.id;
    const updatedExpense = req.body;
    expenseSchema.parse(updatedExpense);

    const expense = await updateExpense(expenseId, updatedExpense);
    return res.status(OK).json({ expense });
  }
);

export const deleteExpenseHandler = catchErrors(
  async (req: Request, res: Response) => {
    const expenseId = req.params.id;

    await deleteExpense(expenseId);
    return res.status(OK).json({ message: "Expense deleted successfully" });
  }
);
