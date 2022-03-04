import React, { Dispatch, SetStateAction } from "react";
import { Alert } from "react-bootstrap";

type Props = {
  message: string | null;
  setMessage: Dispatch<SetStateAction<string | null>>;
};

const Message = ({ message, setMessage }: Props) => {
  
  return (
    <Alert
      variant="danger"
      style={{
        visibility: message ? "visible" : "hidden",
        height: "4rem",
        margin: 0,
        textAlign: "center",
      }}
      onClose={() => setMessage(null)}
      dismissible
    >
      {message}
    </Alert>
  );
};

export default Message;
