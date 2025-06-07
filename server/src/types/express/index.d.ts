import "express";

declare module "express" {
  interface Request {
    user: {
      userId: string;
      sessionId: string;
      iat: number;
      exp: number;
      aud: string[];
    };
  }
}
