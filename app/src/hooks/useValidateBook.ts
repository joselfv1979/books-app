import { useState } from 'react';
import { IBook } from '../types/Book';

export const useValidateBook = () => {
    const [validateError, setValidateError] = useState<string | null>(null);
    const validateBook = (book: IBook) => {
        const { title, author, price, pages } = book;
        if (!title) {
            setValidateError('Title is required');
            return false;
        }
        if (!author) {
            setValidateError('Author is required');
            return false;
        }
        if (!price) {
            setValidateError('Price is required');
            return false;
        }
        if (!pages) {
            setValidateError('Pages is required');
            return false;
        }
        return true;
    };
    return { validateError, setValidateError, validateBook };
};
