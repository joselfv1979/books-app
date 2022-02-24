import Book, { IBook } from "../models/Book";
import { ObjectId } from "mongodb";
import { response } from "express";

export async function getBooksService() {
  try {
    return await Book.find();
  } catch (error) {
    throw Error(error);
  }
}

export async function getBookService(id: ObjectId) {
  try {
    return await Book.findById(id);
  } catch (error) {
    throw Error(error);
  }
}

export async function createBookService(book: IBook) {
  try {
    const savedBook = await book.save();
    return savedBook;
  } catch (error) {
    throw Error(error);
  }
}

export async function updateBookService(id: ObjectId, book: IBook) {
  try {
    const response = await Book.findByIdAndUpdate(id, book, { new: true });
    return response;
  } catch (error) {
    throw Error(error);
  }
}

export async function deleteBookService(id: ObjectId) {
  try {
    return Book.findByIdAndDelete(id);
  } catch (error) {
    throw Error(error);
  }
}
