import axios from "axios";
import { IBook } from "../types/Book";
import { getHeaders } from "../utils/authHeader";

const baseUrl = "http://localhost:7000/api/books";

const token = getHeaders();

export const getAllBooks = async () => {
  const res = await axios.get(baseUrl, { headers: token });
  return res;
};

export const getBook = async (id: string) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res;
};

export const createBook = async (book: IBook) => {
  console.log({book});
  
  const res = await axios.post(baseUrl, book, { headers: token });
  console.log('api',{res});
  
  return res;
};

export const removeBook = async (id: string) => {
  const res = await axios.delete(`${baseUrl}/${id}`, { headers: token });
  console.log(res.data);
  return res;
};

export const updateBook = async (book: IBook) => {
  const res = await axios.put(`${baseUrl}/${book.id}`, book, { headers: token });
  return res;
};
