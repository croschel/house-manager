import zod from "zod";

const emailSchema = zod
  .string()
  .email()
  .min(1, "Email is required")
  .max(255, "Email is too long");
const passwordSchema = zod
  .string()
  .min(6, "Password is required")
  .max(255, "Password is too long");

export const loginSchema = zod.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: zod.string().optional(),
});

export const registerSchema = loginSchema
  .extend({
    confirmPassword: zod
      .string()
      .min(6, "Password is required")
      .max(255, "Password is too long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
