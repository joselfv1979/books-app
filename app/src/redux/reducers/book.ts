import { ActionType, Action } from "../actionTypes/book";
import { IBook } from "../../types/Book";

interface State {
  books: IBook[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: State = {
  books: [],
  status: "idle",
  error: null,
};

const bookReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.GET_BOOKS_PENDING:
      return { ...state, status: "loading", error: null };
    case ActionType.GET_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload,
        status: "succeeded",
        error: null,
      };
    case ActionType.GET_BOOKS_FAIL:
      return { ...state, books: [], status: "failed", error: action.payload };
    case ActionType.ADD_BOOK_SUCCESS:
      return {
        ...state,
        books: [...state.books, action.payload],
        status: "succeeded",
        error: null,
      };
    case ActionType.ADD_BOOK_FAIL:
      return { ...state, status: "failed", error: action.payload };
    case ActionType.REMOVE_BOOK_SUCCESS:
      return {
        ...state,
        books: state.books.filter(
          (item: IBook) => item.id !== action.payload.id
        ),
        status: "succeeded",
        error: null,
      };

    case ActionType.REMOVE_BOOK_FAIL:
      return {
        ...state,
        books: state.books,
        status: "failed",
        error: action.payload,
      };

    case ActionType.UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        books: state.books.map((item: IBook) =>
          item.id === action.payload.id ? action.payload : item
        ),
        status: "succeeded",
        error: null,
      };

    case ActionType.UPDATE_BOOK_FAIL:
      return { ...state, status: "failed", error: action.payload };

    case ActionType.REMOVE_BOOK_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default bookReducer;
