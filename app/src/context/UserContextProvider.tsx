import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/users";
import { Auth } from "../types/Auth";
import { UserContext } from "./UserContext";

type Props = {
  children: ReactNode;
};

export const UserContextProvider = ({ children }: Props) => {
  const storedUser = localStorage.getItem("user");

  useEffect(() => {
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (user) {
      setUser(user);
    }
  }, []);
  // the value that will be given to the context
  const [user, setUser] = useState<Auth | null>(null);
  const isAdmin = user?.username === "admin" ? true : false;

  const navigate = useNavigate();

  const login = async (user: Auth) => {
    try {
      const { data } = await loginUser(user);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));

      data && navigate("/books");
    } catch (error: any) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    // the Provider gives access to the context to its children
    <UserContext.Provider value={{ user, setUser, isAdmin, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
