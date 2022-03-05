import React, { useCallback, useEffect, useState } from "react";
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

  const { books, loading, error } = useTypedSelector((state) => state.books);

  useEffect(() => {
    const getAllBooks = async () => await dispatch(getBooks());
    
    getAllBooks();
  }, []);

  const removeBook = useCallback(
    async (book: IBook) => await dispatch(deleteBook(book)),
    [dispatch, deleteBook]
  );

  return (
    <Container>
      {error && <Message message={error} />}
      {loading ? (
        <Spinner animation="border" className={styles.spinner} />
      ) : (
        <BookList books={books} removeBook={removeBook} />
      )}
    </Container>
  );
};

export default Books;
