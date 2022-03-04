import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import { CustomError } from "../models/CustomError";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.utils";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!user || !passwordCorrect) {
      next(new CustomError(401, "Invalid credentials"));
      return;
    }

    const token = generateToken(user.id, username, user.role);

    res.send({
      id: user.id,
      username,
      role: user.role,
      token,
    });
  } catch (error) {
    console.log(error);
  }
}
