import React, { Dispatch, SetStateAction } from "react";
import { removeBookError } from "../redux/actionCreators/book";
import { useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";

type Props = {
  message: string | null;
  setMessage?: Dispatch<SetStateAction<string | null>>;
};

const Message = ({ message, setMessage }: Props) => {

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
