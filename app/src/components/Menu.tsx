import React from 'react';
import { useUserContext } from '../context/user/UserContext';
import { Link } from 'react-router-dom';
import styles from '../scss/menu.module.scss';
import UserLogMenu from './UserLogMenu';

const Menu = () => {
    const { isAdmin } = useUserContext();

    return (
        <ul className="text-white bg-dark">
            <li>
                <Link to="/">Welcome</Link>
            </li>
            <li>
                <Link to="/books">Books</Link>
            </li>
            <li>
                <Link to="/contact">Contact</Link>
            </li>
            {isAdmin && (
                <>
                    <li>
                        <Link to="/newBook">New Book</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                </>
            )}
            <li className={styles.userSubmenu}>
                <UserLogMenu />
            </li>
        </ul>
    );
};

export default Menu;
