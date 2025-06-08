import "express";
import { UserRequest } from "../../interfaces/requests/general";

declare module "express" {
  interface Request {
    user: UserRequest;
  }
}

declare global {
  namespace Express {
    interface Request {
      user: UserRequest;
    }
  }
}
