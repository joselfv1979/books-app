export const getHeaders = () => {
    const storedUser = localStorage.getItem('user');
    const token = storedUser ? JSON.parse(storedUser).token : null;

    return {
        'Content-Type': 'application/json',
        authorization: `bearer ${token}`,
    };
};
