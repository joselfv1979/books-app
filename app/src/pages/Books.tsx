import React, { useCallback, useEffect, useState } from 'react';
import BookList from '../components/BookList';
import { IBook } from '../types/Book';
import { getBooks, deleteBook, removeBookError } from '../redux/actionCreators/book';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypeSelector';
import { Container } from 'react-bootstrap';
import Message from '../components/Message';
import { useUserContext } from '../context/user/UserContext';
import { getHeaders } from '../utils/authHeader';

const Books = () => {
    const { user } = useUserContext();

    console.log('user-logged: ', user);
    const token = getHeaders();
    console.log('login-token: ', token);
    const dispatch = useDispatch();

    const { books, status, error } = useTypedSelector((state) => state.books);

    const [success, setSuccess] = useState<string | null>(null);

    const message = error || success;

    useEffect(() => {
        if (status === 'idle') dispatch(getBooks());
    }, [status, dispatch]);

    const removeBook = useCallback(
        (book: IBook) => {
            if (dispatch(deleteBook(book))) setSuccess('Book deleted successfully');
            setTimeout(() => {
                setSuccess(null);
            }, 2000);
        },
        [dispatch, deleteBook],
    );

    const cancelMessage = () => {
        if (error) dispatch(removeBookError());
        if (success) setSuccess(null);
    };

    return (
        <Container>
            {message && <Message error={error} success={success} cancelMessage={cancelMessage} />}
            {books && <BookList books={books} removeBook={removeBook} />}
        </Container>
    );
};

export default Books;
