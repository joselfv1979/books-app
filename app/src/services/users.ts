import axios from "axios";
import { IUser } from "../types/User";
import { Auth } from "../types/Auth";

const usersUrl = "http://localhost:7000/api/users";
const loginUrl = "http://localhost:7000/api/login";

export const getAllUsers = async () => {
  const res = await axios.get(usersUrl);
  return res;
};

export const getUser = async (id: string) => {
  const res = await axios.get(`${usersUrl}/${id}`);
  return res;
}

export const createUser = async (user: IUser) => {
  const res = await axios.post(usersUrl, user);
  return res;
};

export const removeUser = async (id: string) => {
  const res = await axios.delete(`${usersUrl}/${id}`);
  return res
}

export const updateUser = async (user: IUser) => {
  const res = await axios.put(`${usersUrl}/${user.id}`, user);
  return res;
}

export const loginUser = async (data: Auth) => {  
  const res = await axios.post(loginUrl, data);
  return res;
};
