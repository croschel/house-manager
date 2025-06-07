import "express";

declare module "express" {
  interface Request {
    user?: any; // Replace 'any' with your payload type if you have one
  }
}
