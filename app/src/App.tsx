import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookList from "./pages/Books";
import NewUser from "./pages/NewUser";
import NewBook from "./pages/NewBook";
import Menu from "./components/Menu";
import AdminRoute from "./components/AdminRoute";
import EditBook from "./pages/EditBook";
import Login from "./pages/Login";
import Book from "./pages/Book";
import About from "./pages/About";
import "./style.module.scss";
import NotFound from "./pages/NotFound";
import { useTypedSelector } from "./hooks/useTypeSelector";
import Message from "./components/Message";
import { Spinner } from "react-bootstrap";
import styles from "./style.module.scss";
import { useMessageContext } from "./context/message/MessageContext";

const App = () => {
  const { status, error } = useTypedSelector((state) => state.books);
  const { message } = useMessageContext();
  const notification = message || error;

  return (
    <div className="app">
      <Menu />
      {status === "loading" && (
        <Spinner animation="border" className={styles.spinner} />
      )}
      {notification && <Message message={notification} />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<About />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/register" element={<NewUser />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/newBook"
            element={
              <AdminRoute>
                <NewBook />
              </AdminRoute>
            }
          />
          <Route
            path="/book-edit/:id"
            element={
              <AdminRoute>
                <EditBook />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
