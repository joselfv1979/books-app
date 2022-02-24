import React from "react";
import { useUserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const AdminRoute = ({ children }: Props) => {
  const { isAdmin } = useUserContext();

  return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
