import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookList from "./pages/Books";
import User from "./pages/UserForm";
import BookForm from "./pages/BookForm";
import Menu from "./components/Menu";
import AdminRoute from "./components/AdminRoute";
import BookEdit from "./pages/BookEdit";
import Login from "./pages/Login";
import Book from "./pages/Book";
import About from "./pages/About";
import "./style.module.scss";

function App() {
  return (
    <div className="app">
      <Menu />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<About />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/register" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/newBook"
            element={
              <AdminRoute>
                <BookForm />
              </AdminRoute>
            }
          />
          <Route
            path="/book-edit/:id"
            element={
              <AdminRoute>
                <BookEdit />
              </AdminRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
