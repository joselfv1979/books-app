import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/User";
import { CustomError } from "../models/CustomError";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

import {
  getUserService,
  getUsersService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "../services/userService";

export async function getUsersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getUsersService();
    res.json(users);
  } catch (error) {
    next(new CustomError(404, "Users not found"));
  }
}

export async function getUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = await getUserService(new ObjectId(id));
    res.json(data);
  } catch (error) {
    next(new CustomError(404, "User not found"));
  }
}

export async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { fullname, username, email, password, roles } = req.body;

    if (!fullname || !username || !email || !password || !roles) {
      next(new CustomError(400, "Bad request"));
    }

    const SaltRounds = 10;
    const passwordHash = await bcrypt.hash(password, SaltRounds);
    const newuser: IUser = new User({
      fullname,
      username,
      email,
      passwordHash,
      roles,
    });
    const response = await createUserService(newuser);
    res.status(201).json(response);
  } catch (error) {
    next(new CustomError(500, "Couldn't create new user"));
  }
}

export async function updateUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { fullName, username, email } = req.body;
    if (!fullName || !username || !email) {
      next(new CustomError(400, "Bad request"));
    }
    const user = await updateUserService(new ObjectId(id), req.body);

    res.status(201).json(user);
  } catch (error) {
    next(new CustomError(500, "Couldn't update user"));
  }
}

export async function deleteUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    await deleteUserService(new ObjectId(id));

    res.status(204).end();
  } catch (error) {
    throw new CustomError(500, "Couldn't delete user");
  }
}
