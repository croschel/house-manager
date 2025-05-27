import { Router } from "express";
import {
  createExpenseHandler,
  deleteExpenseHandler,
  getExpensesHandler,
  updateExpenseHandler,
} from "../controllers/expense.controller";

const expenseRoutes = Router();

expenseRoutes.get("/list", getExpensesHandler);
expenseRoutes.post("/create", createExpenseHandler);
expenseRoutes.put("/update/:id", updateExpenseHandler);
expenseRoutes.delete("/delete/:id", deleteExpenseHandler);

export default expenseRoutes;
