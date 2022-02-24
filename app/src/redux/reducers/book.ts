import { ActionType, Action } from "../actionTypes/book";
import { IBook } from "../../types/Book";

interface State {
  books: IBook[];
  book?: IBook;
  loading?: boolean;
  error?: string;
}

const initialState = {
  books: [],
  loading: false,
};

const bookReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.GET_BOOKS_PENDING:
      return {
        books: [],
        loading: true,
      };
    case ActionType.GET_BOOKS_SUCCESS:
      return {
        loading: false,
        books: action.payload,
      };
    case ActionType.GET_BOOKS_FAIL:
      return {
        loading: false,
        error: action.payload,
        books: [],
      };
    case ActionType.ADD_BOOK_SUCCESS:
      console.log("reducer", { action });

      return {
        books: [...state.books, action.payload],
      };
    case ActionType.ADD_BOOK_FAIL:
      return {
        error: action.payload,
        books: state.books,
      };
    case ActionType.REMOVE_BOOK_SUCCESS:
      return {
        books: state.books.filter(
          (item: IBook) => item.id !== action.payload.id
        ),
      };

    case ActionType.REMOVE_BOOK_FAIL:
      return {
        books: state.books,
        error: action.payload,
      };

    case ActionType.UPDATE_BOOK_SUCCESS:
      return {
        books: state.books.map((item: IBook) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case ActionType.UPDATE_BOOK_FAIL:
      return {
        books: state.books,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookReducer;
