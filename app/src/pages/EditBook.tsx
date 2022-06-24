import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { editBook, removeBookError } from '../redux/actionCreators/book';
import { useDispatch } from 'react-redux';
import { IBook } from '../types/Book';
import { Button, Form, Row, Col } from 'react-bootstrap';
import styles from '../scss/editBook.module.scss';
import { getBook } from '../services/books';
import { useTypedSelector } from '../hooks/useTypeSelector';
import { useValidateBook } from '../hooks/useValidateBook';
import Message from '../components/Message';

const BookEdit = () => {
    const { id } = useParams();

    const { error } = useTypedSelector((state) => state.books);
    const [validateError, setValidateError, validateBook] = useValidateBook();
    const fail = error || validateError;

    const [success, setSuccess] = useState<string | null>(null);
    const message = fail || success;

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const initialState: IBook = {
        id: '',
        title: '',
        author: '',
        price: undefined,
        pages: undefined,
    };

    useEffect(() => {
        const fetchBook = async () => {
            const res = await getBook(String(id));
            res.success ? setValues(res.value) : null;
        };
        fetchBook();
    }, []);

    const [values, setValues] = useState<IBook>(initialState);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateBook(values)) {
            return;
        }
        saveBook();
    };

    const saveBook = async () => {
        if (await dispatch(editBook(values))) {
            setSuccess('Book updated successfully');
            setTimeout(() => {
                setSuccess(null);
                navigate('/books');
            }, 2000);
        }
    };

    const cancelMessage = () => {
        if (validateError) setValidateError(null);
        if (error) dispatch(removeBookError());
        if (success) setSuccess(null);
    };

    return (
        <>
            {message && <Message fail={fail} success={success} cancelMessage={cancelMessage} />}
            <Form className={styles.bookForm} onSubmit={submit}>
                <h1>Edit Book</h1>
                <Form.Group as={Row} className="mb-4" controlId="formBasicFullName">
                    <Form.Label column sm={2}>
                        Title
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            name="title"
                            type="text"
                            placeholder="Enter title"
                            defaultValue={values.title}
                            onChange={onChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4" controlId="formBasicFullName">
                    <Form.Label column sm={2}>
                        Author
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            name="author"
                            type="text"
                            placeholder="Enter author"
                            defaultValue={values.author}
                            onChange={onChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4" controlId="formBasicFullName">
                    <Form.Label column sm={2}>
                        Price
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            name="price"
                            type="number"
                            placeholder="Enter price"
                            defaultValue={values.price}
                            onChange={onChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4" controlId="formBasicFullName">
                    <Form.Label column sm={2}>
                        Pages
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            name="pages"
                            type="number"
                            placeholder="Enter pages"
                            defaultValue={values.pages}
                            onChange={onChange}
                        />
                    </Col>
                </Form.Group>

                <div className={styles.buttonGroup}>
                    <Button variant="primary" type="submit">
                        Save
                    </Button>
                    <Button variant="danger" onClick={() => navigate('/books')}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </>
    );
};

export default BookEdit;
