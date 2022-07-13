import { Dispatch } from 'redux';
import { ActionType, UserAction } from '../actionTypes/user';
import { getAllUsers, createUser, removeUser, updateUser } from '../../services/users';
import { IUser } from '../../types/User';
import { validateUser } from '../../utils/validateUser';

export const getUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: ActionType.GET_USERS_PENDING,
        });

        const res = await getAllUsers();
        if (res.success) {
            dispatch({
                type: ActionType.GET_USERS_SUCCESS,
                payload: res.value,
            });
        } else {
            dispatch({
                type: ActionType.GET_USERS_FAIL,
                payload: res.message,
            });
        }
    };
};

export const addUser = (user: IUser) => {
    return async (dispatch: Dispatch<UserAction>) => {
        const validUser = validateUser(user);

        if (!validUser.success) {
            dispatch({
                type: ActionType.ADD_USER_FAIL,
                payload: validUser.message,
            });
            return;
        }

        const res = await createUser(user);

        if (res.success) {
            dispatch({
                type: ActionType.ADD_USER_SUCCESS,
                payload: user,
            });
        } else {
            dispatch({
                type: ActionType.ADD_USER_FAIL,
                payload: res.message,
            });
        }
        return res.success;
    };
};

export const deleteUser = (user: IUser) => {
    return async (dispatch: Dispatch<UserAction>) => {
        const res = await removeUser(user.id);

        if (res.success) {
            dispatch({
                type: ActionType.REMOVE_USER_SUCCESS,
                payload: res.value,
            });
        } else {
            dispatch({
                type: ActionType.REMOVE_USER_FAIL,
                payload: res.message,
            });
        }
    };
};

export const editUser = (user: IUser) => {
    return async (dispatch: Dispatch<UserAction>) => {
        const res = await updateUser(user);

        if (res.success) {
            dispatch({
                type: ActionType.UPDATE_USER_SUCCESS,
                payload: res.value,
            });
            return res.value;
        } else {
            dispatch({
                type: ActionType.UPDATE_USER_FAIL,
                payload: res.message,
            });
        }
    };
};

export const removeUserError = () => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: ActionType.REMOVE_USER_ERROR,
        });
    };
};
