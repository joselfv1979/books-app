import React from "react";
import { useUserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { BoxArrowRight } from "react-bootstrap-icons";
import styles from "../scss/menu.module.scss";

const Menu = () => {
  const { user, setUser, isAdmin } = useUserContext();

  const navigate = useNavigate();

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
      {user ? (
        <li className={styles.userSubmenu}>
          <p>{user.username}</p>
          <BoxArrowRight className={styles.logoutIcon} onClick={logout} />
        </li>
      ) : (
        <li className={styles.userSubmenu}>
          <Link to="/login">Login</Link>
        </li>
      )}
    </ul>
  );
};

export default Menu;
