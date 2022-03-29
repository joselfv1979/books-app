import React, { useCallback, useEffect } from "react";
import BookList from "../components/BookList";
import { IBook } from "../types/Book";
import { getBooks, deleteBook } from "../redux/actionCreators/book";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { Container } from "react-bootstrap";

const Books = () => {
  const dispatch = useDispatch();

  const { books, status } = useTypedSelector((state) => state.books);

  useEffect(() => {
    if (status === "idle") dispatch(getBooks());
  }, [status, dispatch]);

  const removeBook = useCallback(
    (book: IBook) => dispatch(deleteBook(book)),
    [dispatch, deleteBook]
  );

  return (
    <Container>
      {status === "succeeded" && (
        <BookList books={books} removeBook={removeBook} />
      )}
    </Container>
  );
};

export default Books;
