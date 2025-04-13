import { CREATED } from "../constants/http";
import { createAccount } from "../services/auth.service";
import catchErrors from "../utils/catchErrors";
import zod from "zod";
import { setAuthCookies } from "../utils/cookies";

const registerSchema = zod
  .object({
    email: zod
      .string()
      .email()
      .min(1, "Email is required")
      .max(255, "Email is too long"),
    password: zod
      .string()
      .min(6, "Password is required")
      .max(255, "Password is too long"),
    confirmPassword: zod
      .string()
      .min(6, "Password is required")
      .max(255, "Password is too long"),
    userAgent: zod.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerHandler = catchErrors(async (req, res, next) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });
  const { accessToken, refreshToken, user } = await createAccount(request);

  return setAuthCookies(res, accessToken, refreshToken)
    .status(CREATED)
    .json({ user });
});
