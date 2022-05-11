import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/user/UserContext';
import { loginUser } from '../services/users';
import LoginForm from '../components/LoginForm';
import { Auth } from '../types/Auth';
import { Container } from 'react-bootstrap';
import styles from '../scss/login.module.scss';
import Message from '../components/Message';

const Login = () => {
    const { setUser } = useUserContext();

    const [fail, setFail] = useState<string | null>(null);

    const navigate = useNavigate();

    const login = async (userData: Auth) => {
        const res = await loginUser(userData);
        if (res.success) {
            setUser(res.value);
            localStorage.setItem('user', JSON.stringify(res.value));
            navigate('/books');
        } else {
            setFail(res.message);
        }
    };

    const cancelMessage = () => {
        setFail(null);
    };

    return (
        <>
            <Container className={styles.loginContainer}>
                {fail && <Message fail={fail} cancelMessage={cancelMessage} />}
                <LoginForm login={login} />
            </Container>
        </>
    );
};

export default Login;
