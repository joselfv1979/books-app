import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/user/UserContext';

type Props = {
    children: JSX.Element;
};

const AdminRoute = ({ children }: Props) => {
    const { isAdmin } = useUserContext();

    return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
