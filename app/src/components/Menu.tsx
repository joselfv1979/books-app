import React from "react";
import { useUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { BoxArrowRight } from "react-bootstrap-icons";

const Menu = () => {
  const { user, isAdmin, logout } = useUserContext();
  
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
