import { Request, Response, NextFunction } from "express";
import { CustomError } from "../models/CustomError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error handling middleware called.");
  // For unhandled errors.
  if (err instanceof CustomError) {
    res.status(err.status).send(err.message);
  } else {
    res.status(500).send("Something went wrong");
  }
};
