import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../models/CustomError";

export interface AuthRequest extends Request {
  userId: string;
}

const authHandler = (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  const authorization = request.get("authorization");
  console.log({ authorization });

  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7);
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    // console.error(error);
  }

  if (!token || !decodedToken) {
    next(new CustomError(401, "token missing or invalid"));
  }

  const { id: userId } = decodedToken;

  console.log("auth", userId);

  request.userId = userId;

  next();
};

module.exports = {
  authHandler,
};
