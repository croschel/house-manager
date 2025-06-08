import { z } from "zod";
import { errorMessages } from "./error.message";

export const marketSchema = z.object({
  date: z.string().min(1, errorMessages.requiredField),
});
