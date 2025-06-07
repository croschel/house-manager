import { Router } from "express";
import {
  createExpenseHandler,
  deleteExpenseHandler,
  getExpensesHandler,
  updateExpenseHandler,
} from "../controllers/expense.controller";
import { authenticate } from "../middleware/authenticate";

const expenseRoutes = Router();

expenseRoutes.get("/list", authenticate, getExpensesHandler);
expenseRoutes.post("/create", authenticate, createExpenseHandler);
expenseRoutes.put("/update/:id", authenticate, updateExpenseHandler);
expenseRoutes.delete("/delete/:id", authenticate, deleteExpenseHandler);

export default expenseRoutes;
