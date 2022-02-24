import axios from "axios";
import { IBook } from "../types/Book";
import { getHeaders } from "../utils/authHeader";

const baseUrl = "http://localhost:7000/api/books";

export const getAllBooks = async () => {
  const reqHeader = getHeaders();
  console.log('service', reqHeader);
  
  const res = await axios.get(baseUrl, { headers: getHeaders() });
  return res;
};

export const getBook = async (id: string) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res;
};

export const createBook = async (book: IBook) => {
  const res = await axios.post(baseUrl, book);
  return res;
};

export const removeBook = async (id: string) => {
  const res = await axios.delete(`${baseUrl}/${id}`);
  console.log(res.data);
  return res;
};

export const updateBook = async (book: IBook) => {
  const res = await axios.put(`${baseUrl}/${book.id}`, book);
  return res;
};
