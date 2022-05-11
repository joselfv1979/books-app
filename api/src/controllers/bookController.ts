import { NextFunction, Request, Response } from "express";
import Book, { IBook } from "../models/Book";
import { CustomError } from "../models/CustomError";
import { ObjectId } from "mongodb";

import {
  getBooksService,
  getBookService,
  createBookService,
  updateBookService,
  deleteBookService,
} from "../services/bookService";

export async function getBooksController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const books = await getBooksService();
    res.json(books);
  } catch (error) {
    next(new CustomError(404, "Books not found"));
  }
}

export async function getBookController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const book = await getBookService(new ObjectId(id));
    res.json(book);
  } catch (error) {
    next(new CustomError(404, "Book not found"));
  }
}

export async function createBookController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { title, author, price, pages } = req.body;

    if (!title || !author || !price || !pages) {
      next(new CustomError(400, "Bad request"));
      return;
    }

    const newBook: IBook = new Book({
      title,
      author,
      price,
      pages,
    });
    const book = await createBookService(newBook);
    res.status(201).json(book);
  } catch (error) {
    next(new CustomError(500, "Couldn' create new book"));
  }
}

export async function updateBookController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { title, author, price, pages } = req.body;

    if (!title || !author || !price || !pages) {
      next(new CustomError(400, "Bad request"));
      return;
    }
    const book = await updateBookService(new ObjectId(id), req.body);

    res.status(201).json(book);
  } catch (error) {
    next(new CustomError(500, "Couldn't update book"));
  }
}

export async function deleteBookController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    await deleteBookService(new ObjectId(id));
    // res.status(200).json({ message: "Book deleted" });
    res.status(204).end();
  } catch (error) {
    next(new CustomError(500, "Couldn't delete book"));
  }
}
