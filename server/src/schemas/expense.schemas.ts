import { z } from "zod";
import { errorMessages } from "./error.message";

export const expenseSchema = z.object({
  name: z.string().min(1, errorMessages.requiredField),
  category: z.string().min(1, errorMessages.requiredField),
  value: z.number().min(1, errorMessages.requiredField),
  date: z.string(),
  local: z.string(),
  repeatedExpense: z.boolean(),
  otherCategory: z.string(),
});
