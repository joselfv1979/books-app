import React, { ReactNode } from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import AddUser from '../pages/AddUser';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import App from '../App';

describe('user-form', () => {
    type Props = {
        children?: ReactNode;
    };

    const wrapper = ({ children }: Props) => (
        <Provider store={store}>
            <BrowserRouter>{children}</BrowserRouter>
        </Provider>
    );

    beforeEach(() => {
        render(<AddUser />, { wrapper });
    });
    it('renders user form', () => {
        const userForm = screen.getByTestId('user-form');

        expect(userForm).toBeInTheDocument();
    });

    it('should display a blank user form', () => {
        const userForm = screen.getByTestId('user-form');
        expect(userForm).toHaveFormValues({
            fullname: '',
            username: '',
            email: '',
            password: '',
        });
    });

    it('renders inputs', () => {
        const inputFullname = screen.getByPlaceholderText('Enter full name');
        const inputUsername = screen.getByPlaceholderText('Enter username');
        const inputEmail = screen.getByPlaceholderText('Enter email');
        const inputPassword = screen.getByPlaceholderText('Password');

        expect(inputFullname).toBeInTheDocument();
        expect(inputUsername).toBeInTheDocument();
        expect(inputEmail).toBeInTheDocument();
        expect(inputPassword).toBeInTheDocument();
    });

    it('renders button', () => {
        const submitButton = screen.getByRole('button', { name: 'Submit' });
        expect(submitButton).toBeInTheDocument();
    });

    it('renders span login link', () => {
        const loginLink = screen.getByText(/login here/i);
        expect(loginLink).toBeInTheDocument();
    });

    // it('navigates to login when click on login link', async () => {
    //     const loginLink = screen.getByText(/login here/i);
    //     userEvent.click(loginLink);

    //     await waitFor(() => {
    //         expect(screen.getByText('Login')).toBeInTheDocument();
    //     });
    // });
});
