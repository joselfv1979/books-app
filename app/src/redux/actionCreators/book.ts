import { Dispatch } from "redux";
import { ActionType, Action } from "../actionTypes/book";
import {
  getAllBooks,
  createBook,
  removeBook,
  updateBook,
} from "../../api/books";
import { IBook } from "../../types/Book";

export const getBooks = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GET_BOOKS_PENDING,
    });

    try {
      const { data } = await getAllBooks();

      setTimeout(() => {
        dispatch({
          type: ActionType.GET_BOOKS_SUCCESS,
          payload: data,
        });
      }, 500);
    } catch (err: any) {
      dispatch({
        type: ActionType.GET_BOOKS_FAIL,
        payload: err.message,
      });
    }
  };
};

export const addBook = (book: IBook) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await createBook(book);

      dispatch({
        type: ActionType.ADD_BOOK_SUCCESS,
        payload: data,
      });
      return data;
    } catch (err: any) {
      console.log("action_error", err.response.data);

      dispatch({
        type: ActionType.ADD_BOOK_FAIL,
        payload: err.response.data,
      });
    }
  };
};

export const deleteBook = (book: IBook) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await removeBook(book.id);

      dispatch({
        type: ActionType.REMOVE_BOOK_SUCCESS,
        payload: book,
      });
      return data;
    } catch (err: any) {
      dispatch({
        type: ActionType.REMOVE_BOOK_FAIL,
        payload: err.message,
      });
    }
  };
};

export const editBook = (book: IBook) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await updateBook(book);

      dispatch({
        type: ActionType.UPDATE_BOOK_SUCCESS,
        payload: data,
      });
      return data;
    } catch (err: any) {
      err.message =
        err.response.status === 400
          ? "Please fill out all fields"
          : "Couldn't update book";
      dispatch({
        type: ActionType.UPDATE_BOOK_FAIL,
        payload: err.message,
      });
      console.log("redux", err.response);
    }
  };
};

export const removeBookError = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.REMOVE_BOOK_ERROR
    })
  }
}
