import { z } from "zod";
import { errorMessages } from "./error.message";

export const updateUserSchema = z.object({
  name: z.string().min(1, errorMessages.requiredField),
  email: z
    .string()
    .min(1, errorMessages.requiredField)
    .email(errorMessages.invalidEmail),
});

export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, errorMessages.requiredField),
  newPassword: z.string().min(1, errorMessages.requiredField),
});
