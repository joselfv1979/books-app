import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IBook } from '../types/Book';
import { Card, Button } from 'react-bootstrap';
import { useUserContext } from '../context/user/UserContext';
import styles from '../scss/bookList.module.scss';
import library from './../assets/library.jpg';

type Props = {
    book: IBook;
    removeBook: (book: IBook) => void;
};

const BookCard = ({ book, removeBook }: Props) => {
    const { user } = useUserContext();
    const isAdmin = user?.username === 'admin' ? true : false;

    const navigate = useNavigate();

    return (
        <Card className={styles.bookCard}>
            <Card.Img src={library} className={styles.bookImage} />
            <Card.Header>{book.author}</Card.Header>
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of the card content.
                </Card.Text>
                {isAdmin ? (
                    <div className={styles.buttonGroup}>
                        <Button variant="primary" onClick={() => navigate(`/book-edit/${book.id}`)}>
                            Edit
                        </Button>
                        <Button variant="danger" onClick={() => removeBook(book)}>
                            Delete
                        </Button>
                    </div>
                ) : (
                    <Button variant="primary" onClick={() => navigate(`/book/${book.id}`)}>
                        See more
                    </Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default BookCard;
