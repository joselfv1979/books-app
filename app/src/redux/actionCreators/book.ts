import { Dispatch } from 'redux';
import { ActionType, BookAction } from '../actionTypes/book';
import { getAllBooks, createBook, removeBook, updateBook } from '../../services/books';
import { IBook } from '../../types/Book';
import { validateBook } from '../../utils/validateBook';

export const getBooks = () => {
    return async (dispatch: Dispatch<BookAction>) => {
        dispatch({
            type: ActionType.GET_BOOKS_PENDING,
        });

        const res = await getAllBooks();

        res.success
            ? dispatch({
                  type: ActionType.GET_BOOKS_SUCCESS,
                  payload: res.value,
              })
            : dispatch({
                  type: ActionType.GET_BOOKS_FAIL,
                  payload: res.message,
              });
        return res.success;
    };
};

export const addBook = (book: IBook) => {
    return async (dispatch: Dispatch<BookAction>) => {
        const validBook = validateBook(book);

        if (!validBook.success) {
            dispatch({
                type: ActionType.ADD_BOOK_FAIL,
                payload: validBook.message,
            });
            return;
        }

        const res = await createBook(book);

        res.success
            ? dispatch({
                  type: ActionType.ADD_BOOK_SUCCESS,
                  payload: res.value,
              })
            : dispatch({
                  type: ActionType.ADD_BOOK_FAIL,
                  payload: res.message,
              });
        return res.success;
    };
};

export const deleteBook = (book: IBook) => {
    return async (dispatch: Dispatch<BookAction>) => {
        const res = await removeBook(book.id);

        if (res.success) {
            dispatch({
                type: ActionType.REMOVE_BOOK_SUCCESS,
                payload: book,
            });
        } else {
            dispatch({
                type: ActionType.REMOVE_BOOK_FAIL,
                payload: res.message,
            });
        }
        return res.success;
    };
};

export const editBook = (book: IBook) => {
    return async (dispatch: Dispatch<BookAction>) => {
        const validBook = validateBook(book);

        if (!validBook.success) {
            dispatch({
                type: ActionType.ADD_BOOK_FAIL,
                payload: validBook.message,
            });
            return;
        }

        const res = await updateBook(book);
        res.success
            ? dispatch({
                  type: ActionType.UPDATE_BOOK_SUCCESS,
                  payload: res.value,
              })
            : dispatch({
                  type: ActionType.UPDATE_BOOK_FAIL,
                  payload: res.message,
              });
        return res.success;
    };
};

export const resetBooks = () => {
    return (dispatch: Dispatch<BookAction>) => {
        dispatch({
            type: ActionType.RESET_BOOKS,
        });
    };
};

export const removeBookError = () => {
    return (dispatch: Dispatch<BookAction>) => {
        dispatch({
            type: ActionType.REMOVE_BOOK_ERROR,
        });
    };
};
