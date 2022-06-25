import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { IUser } from '../types/User';
import styles from '../scss/userCard.module.scss';

type Props = {
    user: IUser;
};

const UserCard = ({ user }: Props) => {
    return (
        <Card className={styles.userCard}>
            <Card.Header>{user.username}</Card.Header>
            <Card.Body>
                <Card.Text>{user.fullname}</Card.Text>
                <Card.Text>{user.email}</Card.Text>
                <div className={styles.buttonGroup}>
                    <Button variant="primary">Edit</Button>
                    <Button variant="danger">Delete</Button>
                </div>
            </Card.Body>
        </Card>
    ); // onClick={() => removeBook(book)} onClick={() => navigate(`/book-edit/${book.id}`)}
};

export default UserCard;
