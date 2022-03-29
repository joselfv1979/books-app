import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/user/UserContext";
import { BoxArrowRight } from "react-bootstrap-icons";
import styles from "../scss/menu.module.scss";

const UserLogMenu = () => {
  const { user, setUser } = useUserContext();

  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      {user ? (
        <>
          <p>{user.username}</p>
          <BoxArrowRight className={styles.logoutIcon} onClick={logout} />
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </>
  );
};

export default UserLogMenu;
