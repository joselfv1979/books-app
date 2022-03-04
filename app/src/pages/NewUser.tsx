import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../redux/actionCreators/user";
import { useDispatch } from "react-redux";
import { IUser } from "../types/User";
import { Button, Form, Row, Col } from "react-bootstrap";
import "../scss/userForm.module.scss";

const User = () => {
  const dispatch = useDispatch();
  const initialState: IUser = {
    id: "",
    fullName: "",
    username: "",
    email: "",
    password: "",
    role: "user",
  };

  const [values, setValues] = useState(initialState);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  async function submitCallback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newUser = await dispatch(addUser(values));
    console.log({ newUser });
  }

  const navigate = useNavigate();

  return (
    <Form onSubmit={submitCallback}>
      <h1>Register</h1>
      <Form.Group as={Row} className="mb-3" controlId="formBasicFullName">
        <Form.Label column sm={3}>
          Full name
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            name="fullName"
            type="text"
            placeholder="Enter full name"
            onChange={onChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formBasicUsername">
        <Form.Label column sm={3}>
          Username
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            name="username"
            type="text"
            placeholder="Enter username"
            onChange={onChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
        <Form.Label column sm={3}>
          Email
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={onChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
        <Form.Label column sm={3}>
          Password
        </Form.Label>
        <Col sm={7}>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={onChange}
          />
        </Col>
      </Form.Group>
      <Form.Group>
        <Row>
          <p>
            Do you have an account?
            <span
              style={{ color: "#0d6efd", cursor: "pointer", marginLeft: "0.5rem" }}
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>
        </Row>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default User;
