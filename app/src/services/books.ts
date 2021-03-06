import axios from 'axios';
import { IBook } from '../types/Book';
import { Result } from '../types/Result';
import { getHeaders } from '../utils/authHeader';
import { handleError } from '../utils/handleError';

const baseUrl = 'http://localhost:7000/api/books';

export const getAllBooks = async (): Promise<Result<IBook[]>> => {
    try {
        const { data } = await axios.get(baseUrl);
        return { success: true, value: data };
    } catch (error) {
        return handleError(error);
    }
};

export const getBook = async (id: string): Promise<Result<IBook>> => {
    try {
        const { data } = await axios.get(`${baseUrl}/${id}`);
        return { success: true, value: data };
    } catch (error) {
        return handleError(error);
    }
};

export const createBook = async (book: IBook): Promise<Result<IBook>> => {
    try {
        const { data } = await axios.post(baseUrl, book, { headers: getHeaders() });
        return { success: true, value: data };
    } catch (error) {
        return handleError(error);
    }
};

export const removeBook = async (id: string): Promise<Result<IBook>> => {
    try {
        const { data } = await axios.delete(`${baseUrl}/${id}`, { headers: getHeaders() });
        return { success: true, value: data };
    } catch (error) {
        return handleError(error);
    }
};

export const updateBook = async (book: IBook): Promise<Result<IBook>> => {
    try {
        const { data } = await axios.put(`${baseUrl}/${book.id}`, book, { headers: getHeaders() });
        return { success: true, value: data };
    } catch (error) {
        return handleError(error);
    }
};
