import { Router } from "express";
import { authenticate } from "../middleware/authenticate";
import { getUserHandler } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get("/", authenticate, getUserHandler);

export default userRoutes;
