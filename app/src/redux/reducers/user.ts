import { ActionType, UserAction } from '../actionTypes/user';
import { IUser } from '../../types/User';

export interface UserState {
    users: IUser[];
    loading?: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case ActionType.GET_USERS_PENDING:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case ActionType.GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: null,
            };
        case ActionType.GET_USERS_FAIL:
            return {
                loading: false,
                error: action.payload,
                users: [],
            };
        case ActionType.ADD_USER_SUCCESS:
            return {
                ...state,
                users: [...state.users, action.payload],
                error: null,
            };
        case ActionType.ADD_USER_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case ActionType.REMOVE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.filter((item: IUser) => item.id !== action.payload.id),
                error: null,
            };

        case ActionType.REMOVE_USER_FAIL:
            return {
                ...state,
                users: state.users,
                error: action.payload,
            };

        case ActionType.UPDATE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.map((item: IUser) => (item.id === action.payload.id ? action.payload : item)),
                error: null,
            };

        case ActionType.UPDATE_USER_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case ActionType.REMOVE_USER_ERROR:
            return { ...state, error: null };
        default:
            return state;
    }
};

export default userReducer;
