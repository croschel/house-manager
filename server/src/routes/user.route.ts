import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import {
  getUserHandler,
  updatePasswordHandler,
  updateUserHandler,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", authenticate, getUserHandler);
userRoutes.put("/", authenticate, updateUserHandler);
userRoutes.put("/password", authenticate, updatePasswordHandler);

export default userRoutes;
