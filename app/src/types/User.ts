export type IUser = {
    id: string;
    fullname: string;
    username: string;
    email: string;
    password: string;
    roles: string[];
    token?: string;
};
