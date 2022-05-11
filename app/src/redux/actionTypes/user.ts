import { IUser } from '../../types/User';

export enum ActionType {
    GET_USERS_PENDING = 'GET_USERS_PENDING',
    GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
    GET_USERS_FAIL = 'GET_USERS_FAIL',
    ADD_USER_SUCCESS = 'ADD_USER_SUCCESS',
    ADD_USER_FAIL = 'ADD_USER_FAIL',
    REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS',
    REMOVE_USER_FAIL = 'REMOVE_USER_FAIL',
    UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAIL = 'UPDATE_USER_FAIL',
    REMOVE_USER_ERROR = 'REMOVE_USER_ERROR',
}

interface userActionPending {
    type: ActionType.GET_USERS_PENDING;
}

interface usersActionSuccess {
    type: ActionType.GET_USERS_SUCCESS;
    payload: IUser[];
}

interface userActionSuccess {
    type: ActionType.ADD_USER_SUCCESS | ActionType.REMOVE_USER_SUCCESS | ActionType.UPDATE_USER_SUCCESS;
    payload: IUser;
}

interface userActionFail {
    type:
        | ActionType.GET_USERS_FAIL
        | ActionType.ADD_USER_FAIL
        | ActionType.REMOVE_USER_FAIL
        | ActionType.UPDATE_USER_FAIL;
    payload: string;
}

interface userActionErrorCancel {
    type: ActionType.REMOVE_USER_ERROR;
}

export type UserAction =
    | userActionPending
    | usersActionSuccess
    | userActionSuccess
    | userActionFail
    | userActionErrorCancel;
