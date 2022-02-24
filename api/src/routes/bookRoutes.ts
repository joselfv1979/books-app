import { Router } from "express";

import {
  getBooksController,
  getBookController,
  createBookController,
  updateBookController,
  deleteBookController,
} from "../controllers/bookController";

const authHandler = require('../middlewares/authHandler');

const booksRouter = Router();

booksRouter.get("/", getBooksController);
booksRouter.get("/:id", getBookController);
booksRouter.post("/", createBookController);
booksRouter.put("/:id", updateBookController);
booksRouter.delete("/:id", deleteBookController);

export default booksRouter;
