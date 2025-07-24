import mongoose from "mongoose";

export interface ExpenseDocument extends mongoose.Document {
  id: string;
  type: "expense" | "fund";
  accountId: string;
  name: string;
  value: number;
  category: string;
  otherCategory?: string;
  ownerId: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  isFixedExpense: boolean;
  location: string;
}

const expenseSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["expense", "fund"],
    required: true,
  },
  accountId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  otherCategory: {
    type: String,
    default: "",
  },
  ownerId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: "",
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
  updatedAt: {
    type: String,
    default: new Date().toISOString(),
  },
  isFixedExpense: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    default: "",
  },
});

const ExpenseModel = mongoose.model<ExpenseDocument>("Expense", expenseSchema);

export default ExpenseModel;
