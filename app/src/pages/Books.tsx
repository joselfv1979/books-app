import React, { useCallback, useEffect } from "react";
import BookList from "../components/BookList";
import Message from "../components/Message";
import { IBook } from "../types/Book";
import { getBooks, deleteBook } from "../redux/actionCreators/book";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypeSelector";
import { Container, Spinner } from "react-bootstrap";
import styles from "../style.module.scss";

const Books = () => {
  const dispatch = useDispatch();

  const { books, status, error } = useTypedSelector((state) => state.books);

  useEffect(() => {
    if (status === "idle") dispatch(getBooks());
  }, [status, dispatch]);

  const removeBook = useCallback(
    (book: IBook) => dispatch(deleteBook(book)),
    [dispatch, deleteBook]
  );

  return (
    <Container>
      {status === "failed" && <Message message={error} />}
      {status === "loading" && (
        <Spinner animation="border" className={styles.spinner} />
      )}
      {status === "succeeded" && (
        <BookList books={books} removeBook={removeBook} />
      )}
    </Container>
  );
};

export default Books;
