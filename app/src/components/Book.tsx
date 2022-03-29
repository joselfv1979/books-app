import React from "react";
import { useNavigate } from "react-router-dom";
import { IBook } from "../types/Book";
import { Card, Button } from "react-bootstrap";
import { useUserContext } from "../context/user/UserContext";
import styles from "../scss/bookList.module.scss";

type Props = {
  book: IBook;
  removeBook: (book: IBook) => void;
};

const Book = ({ book, removeBook }: Props) => {
  const { user } = useUserContext();
  const isAdmin = user?.username === "admin" ? true : false;

  const navigate = useNavigate();

  const seeBook = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <Card className={styles.bookCard}>
      <Card.Header onClick={seeBook}>
        {book.author}
      </Card.Header>
      <Card.Body>
        <Card.Title onClick={seeBook}>
          {book.title}
        </Card.Title>
        <Card.Text onClick={seeBook}>
          Some quick example text to build on the card title and make up the
          bulk of the card content.
        </Card.Text>
        {isAdmin && (
          <div className={styles.buttonGroup}>
            <Button
              variant="primary"
              onClick={() => navigate(`/book-edit/${book.id}`)}
            >
              Edit
            </Button>
            <Button variant="danger" onClick={() => removeBook(book)}>
              Delete
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Book;
