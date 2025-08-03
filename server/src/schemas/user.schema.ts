import { z } from "zod";
import { errorMessages } from "./error.message";

export const updateUserSchema = z.object({
  name: z.string().min(1, errorMessages.requiredField),
  email: z
    .string()
    .min(1, errorMessages.requiredField)
    .email(errorMessages.invalidEmail),
});
