import { createContext, useContext } from "react";

export type MessageContent = {
  message: string | null;
  setMessage: (message: string | null) => void;
};

const MessageContext = createContext<MessageContent>({
  message: null,
  setMessage: () => null
});

const useMessageContext = () => {
  const context = useContext(MessageContext);

  if (context === undefined) {
    throw new Error("useMessageContext was used outside of its Provider");
  }

  return context;
};

export { MessageContext, useMessageContext };
