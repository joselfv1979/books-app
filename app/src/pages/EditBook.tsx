import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { editBook } from "../redux/actionCreators/book";
import { useDispatch } from "react-redux";
import { getBook } from "../api/books";
import { IBook } from "../types/Book";
import { Button, Form, Row, Col } from "react-bootstrap";
import styles from "../scss/editBook.module.scss"

const BookEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState: IBook = {
    id: "",
    title: "",
    author: "",
    price: undefined,
    pages: undefined,
  };

  useEffect(() => {
    const fetchBook = async () => {
      const { data } = await getBook(String(id));
      setValues(data);
    };

    fetchBook().catch(console.error);
  }, []);

  const [values, setValues] = useState<IBook>(initialState);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const saveBook = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedBook = await dispatch(editBook(values));
    
    if (updatedBook !== undefined) navigate("/books");
  };

  return (
    <Form onSubmit={saveBook}>
      <h1>Edit Book</h1>
      <Form.Group as={Row} className="mb-3" controlId="formBasicFullName">
        <Form.Label column sm={3}>
          Title
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            name="title"
            type="text"
            placeholder="Enter title"
            defaultValue={values.title}
            onChange={onChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formBasicFullName">
        <Form.Label column sm={3}>
          Author
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            name="author"
            type="text"
            placeholder="Enter author"
            defaultValue={values.author}
            onChange={onChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formBasicFullName">
        <Form.Label column sm={3}>
          Price
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            name="price"
            type="number"
            placeholder="Enter price"
            defaultValue={values.price}
            onChange={onChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formBasicFullName">
        <Form.Label column sm={3}>
          Pages
        </Form.Label>
        <Col sm={7}>
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
        <Button
          variant="primary"
          type="submit"
        >
          Save
        </Button>
        <Button variant="danger" onClick={() => navigate("/books")}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default BookEdit;
