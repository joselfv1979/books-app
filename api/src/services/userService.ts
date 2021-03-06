import User, { IUser } from "../models/User";
import { ObjectId } from "mongodb";

export async function getUsersService() {
  try {
    return await User.find().populate("books", {
      title: 1,
    });
    // return await User.find();
  } catch (error) {
    throw Error(error);
  }
}

export async function getUserService(id: ObjectId) {
  try {
    return await User.findById(id);
  } catch (error) {
    throw Error(error);
  }
}

export async function checkUsernameService(username: string) {
  try {
    return await User.findOne({ username: username });
  } catch (error) {
    throw Error(error);
  }
}

export async function checkEmailService(email: string) {
  try {
    return await User.findOne({ email: email });
  } catch (error) {
    throw Error(error);
  }
}

export async function createUserService(user: IUser) {
  try {
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw Error(error);
  }
}

export async function updateUserService(id: ObjectId, user: IUser) {
  try {
    const response = await User.findByIdAndUpdate(id, user, { new: true });
    return response;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

export async function deleteUserService(id: ObjectId) {
  try {
    return await User.findByIdAndDelete(id);
  } catch (error) {
    throw Error(error);
  }
}
