import { Dispatch } from "redux";
import { ActionType, Action } from "../actionTypes/user";
import {
  getAllUsers,
  createUser,
  removeUser,
  updateUser,
} from "../../api/users";
import { IUser } from "../../types/User";

export const getUsers = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GET_USERS_PENDING,
    });

    try {
      const { data } = await getAllUsers();
      dispatch({
        type: ActionType.GET_USERS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionType.GET_USERS_FAIL,
        payload: error.message,
      });
    }
  };
};

export const addUser = (user: IUser) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await createUser(user);
      console.log("action", { data });

      dispatch({
        type: ActionType.ADD_USER_SUCCESS,
        payload: data,
      });
      return data;
    } catch (err: any) {
      dispatch({
        type: ActionType.ADD_USER_FAIL,
        payload: err.message,
      });
    }
  };
};

export const deleteUser = (user: IUser) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await removeUser(user.id);
      console.log({ data });
      dispatch({
        type: ActionType.REMOVE_USER_SUCCESS,
        payload: user,
      });
    } catch (err: any) {
      dispatch({
        type: ActionType.REMOVE_USER_FAIL,
        payload: err.message,
      });
    }
  };
};

export const editUser = (user: IUser) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await updateUser(user);
      console.log({ data });
      dispatch({
        type: ActionType.UPDATE_USER_SUCCESS,
        payload: data,
      });
      return data;
    } catch (err: any) {
      err.message =
        err.response.status === 400
          ? "Please fill out all fields"
          : "Couldn't update user";
      dispatch({
        type: ActionType.UPDATE_USER_FAIL,
        payload: err.message,
      });
    }
  };
};
