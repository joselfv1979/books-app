import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypeSelector';
import { Container } from 'react-bootstrap';
import { getUsers } from '../redux/actionCreators/user';
import UserList from '../components/UserList';

const Users = () => {
    const dispatch = useDispatch();

    const { users } = useTypedSelector((state) => state.users);

    useEffect(() => {
        dispatch(getUsers());
    }, []);
    return <Container>{users && <UserList users={users} />}</Container>;
};

export default Users;
