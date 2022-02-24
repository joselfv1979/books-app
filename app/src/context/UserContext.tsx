import { createContext, useContext } from "react";
import { Auth } from "../types/Auth";

export type UserContent = {
  user: Auth | null;
  setUser: (user: Auth | null) => void;
  isAdmin: boolean;
  login: (user: Auth) => void;
  logout: () => void;
};

const UserContext = createContext<UserContent>({
  user: null,
  setUser: () => null,
  isAdmin: false,
  login: () => null,
  logout: () => null,
});

// context consumer hook
const useUserContext = () => {
  // get the context
  const context = useContext(UserContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }

  return context;
};

export { UserContext, useUserContext };
