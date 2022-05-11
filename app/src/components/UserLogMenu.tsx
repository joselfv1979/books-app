import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useUserContext } from '../context/user/UserContext';

import { resetBooks } from '../redux/actionCreators/book';

import { useDispatch } from 'react-redux';

import { BoxArrowRight } from 'react-bootstrap-icons';
import styles from '../scss/menu.module.scss';

const UserLogMenu = () => {
    const { user, setUser } = useUserContext();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/login');
        dispatch(resetBooks());
    };

    return (
        <>
            {user ? (
                <>
                    <span className={styles.username}> {user.username}</span>{' '}
                    <BoxArrowRight className={styles.logoutIcon} onClick={logout} />{' '}
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </>
    );
};

export default UserLogMenu;
