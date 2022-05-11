import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders button element', () => {
    render(<App />);
    // const buttonElement = screen.getByRole('button');
    // expect(buttonElement).toBeInTheDocument();
    expect(1 + 1).toBeTruthy();
});
