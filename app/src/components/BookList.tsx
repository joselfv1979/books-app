import React from 'react';
import { IBook } from '../types/Book';
import BookCard from './BookCard';
import { Row, Col } from 'react-bootstrap';

type Props = {
    books: Array<IBook>;
    removeBook: (book: IBook) => void;
};

const BookList = ({ books, removeBook }: Props) => {
    return (
        <>
            <h1>Books</h1>
            <Row>
                {books.length ? (
                    books.map((book, i) => {
                        return (
                            <Col key={i} sm={4}>
                                <BookCard book={book} removeBook={removeBook} />
                            </Col>
                        );
                    })
                ) : (
                    <p style={{ textAlign: 'center' }}>No books found</p>
                )}
            </Row>
        </>
    );
};

export default BookList;
