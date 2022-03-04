import { createContext, useContext } from "react";
import { IUser } from "../types/User";

export type UserContent = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  isAdmin: boolean;
};

const UserContext = createContext<UserContent>({
  user: null,
  setUser: () => null,
  isAdmin: false,
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
