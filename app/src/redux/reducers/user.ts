import { ActionType, Action } from "../actionTypes/user";
import { IUser } from "../../types/User";

interface State {
    users: IUser[];
    loading?: boolean;
    error?: string;
}

const initialState = {
    users: [],
    loading: false
}

const userReducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ActionType.GET_USERS_PENDING:
          return {
            users: [],
            loading: true,
          };
        case ActionType.GET_USERS_SUCCESS:
          return {
            loading: false,
            users: action.payload,
          };
        case ActionType.GET_USERS_FAIL:
          return {
            loading: false,
            error: action.payload,
            users: [],
          };
        case ActionType.ADD_USER_SUCCESS:
          console.log("reducer", { action });
    
          return {
            users: [...state.users, action.payload],
          };
        case ActionType.ADD_USER_FAIL:
          return {
            error: action.payload,
            users: state.users,
          };
        case ActionType.REMOVE_USER_SUCCESS:
          return {
            users: state.users.filter(
              (item: IUser) => item.id !== action.payload.id
            ),
          };
    
        case ActionType.REMOVE_USER_FAIL:
          return {
            users: state.users,
            error: action.payload,
          };
    
        case ActionType.UPDATE_USER_SUCCESS:
          return {
            users: state.users.map((item: IUser) =>
              item.id === action.payload.id ? action.payload : item
            ),
          };
    
        case ActionType.UPDATE_USER_FAIL:
          return {
            users: state.users,
            error: action.payload,
          };
        default:
          return state;
      }
}

export default userReducer;