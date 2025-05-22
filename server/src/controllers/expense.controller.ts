import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors";
import { OK } from "../constants/http";
import { createExpense, getExpenseList } from "../services/expense.service";
import { CreateExpenseRequest } from "../interfaces/requests/expenses";
import { expenseSchema } from "../schemas/expense.schemas";
import { verifyTokenWithCookies } from "../utils/jwt";

export const getExpensesHandler = catchErrors(
  async (req: Request, res: Response) => {
    const { ownerId, to, from } = req.params as unknown as {
      ownerId: string;
      from: Date;
      to?: Date | undefined;
    };
    const expenses = await getExpenseList(ownerId, from, to);
    return res.status(OK).json({ expenses });
  }
);

export const createExpenseHandler = catchErrors(
  async (req: Request, res: Response) => {
    verifyTokenWithCookies(req);
    const newExpense: CreateExpenseRequest = req.body;
    expenseSchema.parse(newExpense);
    const expense = await createExpense(newExpense);
    return res.status(201).json({ expense });
  }
);
