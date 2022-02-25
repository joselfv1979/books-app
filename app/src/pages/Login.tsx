import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Auth } from "../types/Auth";
import { Container, Button, Form, Row, Col } from "react-bootstrap";

const Login = () => {
  const { login } = useUserContext();
  const initialState: Auth = {
    username: "",
    password: "",
  };

  const [values, setValues] = useState(initialState);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  async function submitCallback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    login(values);
  }

  const navigate = useNavigate();

  return (
    <Form onSubmit={submitCallback}>
      <h1>Login</h1>
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
          <span style={{color: "#0d6efd", cursor:"pointer"}}
          onClick={() => navigate("/register" )}>Create an account</span>
        </Row>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Login;
