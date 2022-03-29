import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/user/UserContext";
import { useMessageContext } from "../context/message/MessageContext";
import { loginUser } from "../services/users";
import { Auth } from "../types/Auth";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import styles from "../scss/login.module.scss";

const Login = () => {
  const { setUser } = useUserContext();
  const { setMessage } = useMessageContext();
  const initialState: Auth = {
    username: "",
    password: "",
  };

  const [values, setValues] = useState(initialState);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const { data } = await loginUser(values);

      if (data) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/books");
      }
    } catch (error: any) {
      setMessage(error.response.data);
    }
  }

  return (
    <>
      <Container className={styles.loginContainer}>
        <Form className={styles.loginForm} onSubmit={login}>
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
              <span
                style={{ color: "#0d6efd", cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Create an account
              </span>
            </Row>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Login;
