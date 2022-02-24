import { IBook } from "../../types/Book";

export enum ActionType {
  GET_BOOKS_PENDING = "GET_BOOKS_PENDING",
  GET_BOOKS_SUCCESS = "GET_BOOKS_SUCCESS",
  GET_BOOKS_FAIL = "GET_BOOKS_FAIL",
  GET_BOOK_PENDING = "GET_BOOK_PENDING",
  GET_BOOK_SUCCESS = "GET_BOOK_SUCCESS",
  GET_BOOK_FAIL = "GET_BOOK_FAIL",
  ADD_BOOK_SUCCESS = "ADD_BOOK_SUCCESS",
  ADD_BOOK_FAIL = "ADD_BOOK_FAIL",
  REMOVE_BOOK_SUCCESS = "REMOVE_BOOK_SUCCESS",
  REMOVE_BOOK_FAIL = "REMOVE_BOOK_FAIL",
  UPDATE_BOOK_SUCCESS = "UPDATE_BOOK_SUCCESS",
  UPDATE_BOOK_FAIL = "UPDATE_BOOK_FAIL",
}

interface bookActionPending {
  type: ActionType.GET_BOOKS_PENDING;
}

interface booksActionSuccess {
  type: ActionType.GET_BOOKS_SUCCESS;
  payload: IBook[];
}

interface bookActionSuccess {
  type:
    | ActionType.ADD_BOOK_SUCCESS
    | ActionType.REMOVE_BOOK_SUCCESS
    | ActionType.UPDATE_BOOK_SUCCESS;
  payload: IBook;
}

interface bookActionFail {
  type:
    | ActionType.GET_BOOKS_FAIL
    | ActionType.ADD_BOOK_FAIL
    | ActionType.REMOVE_BOOK_FAIL
    | ActionType.UPDATE_BOOK_FAIL;
  payload: string;
}

export type Action =
  | bookActionPending
  | booksActionSuccess
  | bookActionSuccess
  | bookActionFail;
