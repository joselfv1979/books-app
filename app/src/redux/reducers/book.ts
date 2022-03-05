import { ActionType, Action } from "../actionTypes/book";
import { IBook } from "../../types/Book";

interface State {
  books: IBook[];
  loading?: boolean;
  error: string | null;
}

const initialState = {
  books: [],
  loading: false,
  error: null,
};

const bookReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.GET_BOOKS_PENDING:
      return { ...state, loading: true };
    case ActionType.GET_BOOKS_SUCCESS:
      return { ...state, books: action.payload, loading: false };
    case ActionType.GET_BOOKS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case ActionType.ADD_BOOK_SUCCESS:
      return { ...state, books: [...state.books, action.payload] };
    case ActionType.ADD_BOOK_FAIL:
      return { ...state, error: action.payload };
    case ActionType.REMOVE_BOOK_SUCCESS:
      return {
        ...state,
        books: state.books.filter(
          (item: IBook) => item.id !== action.payload.id
        ),
      };

    case ActionType.REMOVE_BOOK_FAIL:
      return { ...state, books: state.books, error: action.payload };

    case ActionType.UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        books: state.books.map((item: IBook) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case ActionType.UPDATE_BOOK_FAIL:
      return { ...state, error: action.payload };

    case ActionType.REMOVE_BOOK_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default bookReducer;
