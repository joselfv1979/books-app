import React, { ReactNode, useState } from "react";
import { MessageContext } from "./MessageContext";

type Props = {
  children: ReactNode;
};
export const MessageContextProvider = ({ children }: Props) => {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
