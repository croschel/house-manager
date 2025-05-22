import { Router } from "express";
import {
  createExpenseHandler,
  getExpensesHandler,
} from "../controllers/expense.controller";

const expenseRoutes = Router();

expenseRoutes.get("/list", getExpensesHandler);
expenseRoutes.post("/create", createExpenseHandler);

export default expenseRoutes;
