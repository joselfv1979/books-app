import React from "react";
import { useUserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { BoxArrowRight } from "react-bootstrap-icons";
import "../scss/menu.module.scss";

const Menu = () => {
  const { user, setUser, isAdmin } = useUserContext();

  const storedUser = localStorage.getItem("user"); 

  // const user = storedUser ? JSON.parse(storedUser) : null
  // console.log('AdminRoute', {user});

  // const isAdmin = user?.role === 'admin' ? true : false;

  const navigate = useNavigate();

  console.log('menu', user);

  console.log('menu_admin', isAdmin);
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };
  
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
        <li>
          <Link to="/newBook">New Book</Link>
        </li>
      )}
      <li style={{ marginLeft: "auto" }}>
        {user ? (
          <div style={{ display: "flex" }}>
            <p style={{ marginRight: "1rem" }}>{user.username}</p>
            <BoxArrowRight
              color="red"
              style={{ cursor: "pointer" }}
              size={26}
              onClick={logout}
            />
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </li>
    </ul>
  );
};

export default Menu;
