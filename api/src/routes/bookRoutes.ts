import { Router } from "express";

import {
  getBooksController,
  getBookController,
  createBookController,
  updateBookController,
  deleteBookController,
} from "../controllers/bookController";

const { authHandler } = require('../middlewares/authHandler');

const booksRouter = Router();

booksRouter.get("/", getBooksController);
booksRouter.get("/:id", getBookController);
booksRouter.post("/", authHandler, createBookController);
booksRouter.put("/:id", authHandler, updateBookController);
booksRouter.delete("/:id", authHandler, deleteBookController);

export default booksRouter;
