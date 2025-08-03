import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import {
  getUserHandler,
  updateUserHandler,
} from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", authenticate, getUserHandler);
userRoutes.put("/", authenticate, updateUserHandler);

export default userRoutes;
