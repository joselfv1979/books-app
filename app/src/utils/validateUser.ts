import { IUser } from '../types/User';
import { Result } from '../types/Result';

export const validateUser = (user: IUser): Result<IUser> => {
    const { fullname, username, email, password } = user;
    if (!fullname) {
        return { success: false, message: 'Fullname is required' };
    } else if (!username) {
        return { success: false, message: 'Username is required' };
    } else if (!email) {
        return { success: false, message: 'Email is required' };
    } else if (!password) {
        return { success: false, message: 'Password is required' };
    }
    return { success: true, value: user };
};
