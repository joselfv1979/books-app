import React from "react";
import { removeBookError } from "../redux/actionCreators/book";
import { useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";
import { useMessageContext } from "../context/message/MessageContext";

type Props = {
  message: string | null;
};

const Message = ({ message }: Props) => {

  console.log("message-message",{message});
  
  const { setMessage } = useMessageContext();
  const dispatch = useDispatch();

  const cancelMessage = () => {
    dispatch(removeBookError());
    if(setMessage) setMessage(null)
  }
  
  return (
    <Alert
      variant="danger"
      style={{
        visibility: message ? "visible" : "hidden",
        height: "4rem",
        margin: 0,
        textAlign: "center",
      }}
      onClose={cancelMessage}
      dismissible
    >
      {message}
    </Alert>
  );
};

export default Message;
