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
      console.log("redux: ", data);
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
      console.log({ book });

      const { data } = await createBook(book);
      console.log("action", { data });

      dispatch({
        type: ActionType.ADD_BOOK_SUCCESS,
        payload: data,
      });
      return data;
    } catch (err: any) {
      dispatch({
        type: ActionType.ADD_BOOK_FAIL,
        payload: err.message,
      });
    }
  };
};

export const deleteBook = (book: IBook) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await removeBook(book.id);
      console.log({ data });
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
      console.log({ data });
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
      console.log('redux',err.response);
      
    }
  };
};
