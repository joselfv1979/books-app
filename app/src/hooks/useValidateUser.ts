import { useState, Dispatch, SetStateAction } from 'react';
import { IUser } from '../types/User';

export const useValidateUser = (): [
    string | null,
    Dispatch<SetStateAction<string | null>>,
    (user: IUser) => boolean,
] => {
    const [validateError, setValidateError] = useState<string | null>(null);

    const validateUser = (user: IUser) => {
        const { fullname, username, email, password } = user;
        if (!fullname) {
            setValidateError('Fullname is required');
            return false;
        } else if (!username) {
            setValidateError('Username is required');
            return false;
        } else if (!email) {
            setValidateError('Email is required');
            return false;
        } else if (!password) {
            setValidateError('Password is required');
            return false;
        }
        return true;
    };
    return [validateError, setValidateError, validateUser];
};
