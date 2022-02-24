import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { IBook } from "../types/Book";
import { addBook } from "../redux/actionCreators/book";
import { useDispatch } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";

const Book = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState: IBook = {
    id: "",
    title: "",
    author: "",
    price: 0,
    pages: 0,
  };

  const [values, setValues] = useState(initialState);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const saveBook = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ values });

    const resp = await dispatch(addBook(values));
    if(resp !== undefined) navigate('/books');
    console.log({ resp });
  };

  return (
    <Form onSubmit={saveBook}>
      <h1>New Book</h1>
      <Form.Group as={Row} className="mb-3" controlId="formBasicFullName">
        <Form.Label column sm={3}>
          Title
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            name="title"
            type="text"
            placeholder="Enter title"
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
            onChange={onChange}
          />
        </Col>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Book;
