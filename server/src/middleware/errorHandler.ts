import { ErrorRequestHandler } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/http";

// @ts-ignore
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(`PATH: ${req.path}`, err);
  return res.status(INTERNAL_SERVER_ERROR).send("Internal server error");
};

export default errorHandler;
