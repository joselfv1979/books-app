import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import styles from '../scss/bookForm.module.scss';
import { IBook } from '../types/Book';

export type Props = {
    saveBook: (book: IBook) => Promise<void>;
    /*     values: IBook;
    setValues: Dispatch<SetStateAction<IBook>>; */
};

const BookForm = ({ saveBook }: Props) => {
    const initialState: IBook = {
        id: '',
        title: '',
        author: '',
        price: undefined,
        pages: undefined,
    };

    const [values, setValues] = useState<IBook>(initialState);

    const submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        saveBook(values);
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    return (
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
    );
};

export default BookForm;
