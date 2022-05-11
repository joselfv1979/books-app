import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import userEvent from '@testing-library/user-event';
import { loginUser } from '../services/users';

describe('login-form', () => {
    const login = jest.fn();
    const renderLogin = () => {
        render(
            <BrowserRouter>
                <LoginForm login={login} />
            </BrowserRouter>,
        );
    };
    beforeEach(() => renderLogin());
    it('renders login form', () => {
        const loginForm = screen.getByTestId('login-form');

        expect(loginForm).toBeInTheDocument();
    });

    it('should display a blank login form', () => {
        const loginForm = screen.getByTestId('login-form');
        expect(loginForm).toHaveFormValues({
            username: '',
            password: '',
        });
    });

    it('renders inputs', () => {
        const inputUsername = screen.getByPlaceholderText('Enter username');
        const inputPassword = screen.getByPlaceholderText('Password');

        expect(inputUsername).toBeInTheDocument();
        expect(inputUsername).toHaveTextContent('');
        expect(inputPassword).toBeInTheDocument();
    });

    it('renders button', () => {
        const inputUsername = screen.getByLabelText('Username');
        const inputPassword = screen.getByLabelText('Password');

        userEvent.type(inputUsername, 'jose');
        userEvent.type(inputPassword, '1234');

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        // const loginButton = screen.getByText('Submit');
        userEvent.click(submitButton);
        expect(login).toHaveBeenCalled();
        expect(login).toHaveBeenCalledTimes(1);
        expect(login).toHaveBeenCalledWith({ username: 'jose', password: '1234' });
    });
});
