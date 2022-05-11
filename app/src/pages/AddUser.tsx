import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser, removeUserError } from '../redux/actionCreators/user';
import { useDispatch } from 'react-redux';
import { IUser } from '../types/User';
import { Button, Form, Row, Col } from 'react-bootstrap';
import styles from '../scss/userForm.module.scss';
import { useTypedSelector } from '../hooks/useTypeSelector';
import Message from '../components/Message';
import { useValidateUser } from '../hooks/useValidateUser';

const User = () => {
    const { error } = useTypedSelector((state) => state.users);
    const [validateError, setValidateError, validateUser] = useValidateUser();

    const fail = error || validateError;

    const [success, setSuccess] = useState<string | null>(null);

    const message = fail || success;

    const dispatch = useDispatch();

    const initialState: IUser = {
        id: '',
        fullname: '',
        username: '',
        email: '',
        password: '',
        roles: ['user'],
    };

    const [values, setValues] = useState(initialState);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    async function submitCallback(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!validateUser(values)) {
            return;
        }
        saveUser();
    }

    const saveUser = async () => {
        if (await dispatch(addUser(values))) {
            setSuccess('User registered successfully');
            setValues(initialState);
        }
    };

    const cancelMessage = () => {
        if (validateError) setValidateError(null);
        if (error) dispatch(removeUserError());
        if (success) setSuccess(null);
    };

    const navigate = useNavigate();

    return (
        <>
            {message && <Message fail={fail} success={success} cancelMessage={cancelMessage} />}
            <Form className={styles.userForm} onSubmit={submitCallback} data-testid="user-form">
                <h1>Register</h1>
                <Form.Group as={Row} className="mb-3" controlId="formBasicFullname">
                    <Form.Label column sm={3}>
                        Full name
                    </Form.Label>
                    <Col sm={7}>
                        <Form.Control
                            name="fullname"
                            type="text"
                            value={values.fullname}
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
                            value={values.username}
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
                            value={values.email}
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
                            value={values.password}
                            placeholder="Password"
                            onChange={onChange}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={3}></Form.Label>
                    <Col sm={7}>
                        <p>
                            Do you have an account?
                            <span onClick={() => navigate('/login')}>Login here</span>
                        </p>
                    </Col>
                </Form.Group>
                <Form.Group>
                    <Row className="col-md-4 mx-auto">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Row>
                </Form.Group>
            </Form>
        </>
    );
};

export default User;
