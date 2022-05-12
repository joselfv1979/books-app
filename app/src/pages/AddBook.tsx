import React, { useState, ChangeEvent, FormEvent } from 'react';
import { IBook } from '../types/Book';
import { addBook, removeBookError } from '../redux/actionCreators/book';
import { useDispatch } from 'react-redux';
import { Button, Form, Row, Col } from 'react-bootstrap';
import styles from './../scss/bookForm.module.scss';
import Message from '../components/Message';
import { useTypedSelector } from '../hooks/useTypeSelector';
import { useValidateBook } from '../hooks/useValidateBook';

const AddBook = () => {
    const { error } = useTypedSelector((state) => state.books);
    const { validateError, setValidateError, validateBook } = useValidateBook();
    const fail = error || validateError;

    const [success, setSuccess] = useState<string | null>(null);
    const message = fail || success;

    const dispatch = useDispatch();

    const cancelMessage = () => {
        if (validateError) setValidateError(null);
        if (error) dispatch(removeBookError());
        if (success) {
            setSuccess(null);
        }
    };

    const initialState: IBook = {
        id: '',
        title: '',
        author: '',
        price: 0,
        pages: 0,
    };

    const [values, setValues] = useState(initialState);

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
        if (await dispatch(addBook(values))) {
            setSuccess('Book created successfully');
            setTimeout(() => {
                setSuccess(null);
                setValues(initialState);
            }, 2000);
        }
    };

    return (
        <>
            {message && <Message fail={fail} success={success} cancelMessage={cancelMessage} />}
            <Form className={styles.bookForm} onSubmit={submit}>
                <h1>New Book</h1>
                <Form.Group as={Row} className="mb-4" controlId="formBasicFullName">
                    <Form.Label column sm={2}>
                        Title
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            name="title"
                            type="text"
                            value={values.title}
                            placeholder="Enter title"
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
                            value={values.author}
                            placeholder="Enter author"
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
                            value={values.price}
                            placeholder="Enter price"
                            onChange={onChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formBasicFullName">
                    <Form.Label column sm={2}>
                        Pages
                    </Form.Label>
                    <Col sm={8}>
                        <Form.Control
                            name="pages"
                            type="number"
                            value={values.pages}
                            placeholder="Enter pages"
                            onChange={onChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Button className={styles.bookFormButton} variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
};

export default AddBook;