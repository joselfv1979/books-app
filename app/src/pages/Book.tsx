import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IBook } from '../types/Book';
import { Container, Card, Breadcrumb } from 'react-bootstrap';
import styles from '../scss/book.module.scss';
import { ArrowLeftSquareFill } from 'react-bootstrap-icons';
import { getBook } from '../services/books';
import Message from '../components/Message';

const Book = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [book, setBook] = useState<IBook>();
    const [fail, setFail] = useState<string | null>(null);

    useEffect(() => {
        const fetchBook = async () => {
            const res = await getBook(String(id));

            res.success ? setBook(res.value) : setFail(res.message);
        };
        fetchBook();
    }, [id]);

    const cancelMessage = () => {
        setFail(null);
    };

    return (
        <Container>
            {fail && <Message fail={fail} cancelMessage={cancelMessage} />}
            <Breadcrumb.Item href="#">
                <ArrowLeftSquareFill size={26} onClick={() => navigate('/books')} />
            </Breadcrumb.Item>
            <h1>Book</h1>
            {book && (
                <Card className={styles.bookCard}>
                    <Card.Header>{book.author}</Card.Header>
                    <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of the card content.
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default Book;
