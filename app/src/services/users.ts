import axios from 'axios';
import { IUser } from '../types/User';
import { Auth } from '../types/Auth';
import { Result } from '../types/Result';
import { handleError } from '../utils/handleError';

const url = 'http://localhost:7000/api';

export const getAllUsers = async (): Promise<Result<IUser[]>> => {
    try {
        const { data } = await axios.get(`${url}/users`);
        return { success: true, value: data };
    } catch (error) {
        return handleError(error);
    }
};

export const getUser = async (id: string): Promise<Result<IUser>> => {
    try {
        const { data } = await axios.get(`${url}/users/${id}`);
        return { success: true, value: data };
    } catch (error) {
        return handleError(error);
    }
};

export const createUser = async (user: IUser): Promise<Result<IUser>> => {
    try {
        const { data } = await axios.post(`${url}/users`, user);
        console.log({ data });

        return { success: true, value: data };
    } catch (error) {
        return handleError(error);
    }
};

export const removeUser = async (id: string): Promise<Result<IUser>> => {
    try {
        const { data } = await axios.delete(`${url}/users/${id}`);
        return { success: true, value: data };
    } catch (error) {
        return handleError(error);
    }
};

export const updateUser = async (user: IUser): Promise<Result<IUser>> => {
    try {
        const { data } = await axios.put(`${url}/users/${user.id}`, user);
        return { success: true, value: data };
    } catch (error) {
        return handleError(error);
    }
};

export const loginUser = async (user: Auth): Promise<Result<IUser>> => {
    try {
        const { data } = await axios.post(`${url}/login`, user);
        return { success: true, value: data };
    } catch (error) {
        return handleError(error);
    }
};
