import React from 'react';
import { Card } from 'react-bootstrap';
import { IUser } from '../types/User';

type Props = {
    user: IUser;
};

const User = ({ user }: Props) => {
    return (
        <Card>
            <Card.Header>{user.username}</Card.Header>
            <Card.Body>
                {user.fullname}
                {user.email}
            </Card.Body>
        </Card>
    );
};

export default User;
