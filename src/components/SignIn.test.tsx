import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/slices/authSlice';
import SignIn from './SignIn';
import * as api from '../services/api';
import '@testing-library/jest-dom';
import { AxiosHeaders, AxiosResponse } from 'axios';

jest.mock('../services/api', () => ({
  login: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('SignIn Page', () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  const renderComponent = () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignIn />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test('renders the sign-in form correctly', () => {
    renderComponent();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  test('allows the user to input email and password', () => {
    renderComponent();
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  test('submits the form successfully and navigates to dashboard', async () => {
    const mockLogin = api.login as jest.MockedFunction<typeof api.login>;

    const mockResponse: AxiosResponse = {
        data: { token: 'your-token-here' },
        status: 200,
        statusText: 'OK',
        headers: {}, 
        config: {
          url: 'https://reqres.in/api/login',
          method: 'post',
          headers: new AxiosHeaders(), 
        },
      };
    mockLogin.mockResolvedValueOnce(mockResponse);
    renderComponent();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);

    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123'));

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/dashboard'));
  });

  test('displays an error message on failed login', async () => {
    const mockLogin = api.login as jest.MockedFunction<typeof api.login>;
    
    mockLogin.mockRejectedValueOnce({
      response: { data: { error: 'Invalid credentials' } },
    });

    renderComponent();

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);

    const errorMessage = await screen.findByText('Invalid credentials');
    expect(errorMessage).toBeInTheDocument();
  });

  test('navigates to the sign-up page when the sign-up link is clicked', () => {
    renderComponent();

    const signUpLink = screen.getByText('Not a user?');
    fireEvent.click(signUpLink);

    expect(mockNavigate).toHaveBeenCalledWith('/signUp');
  });
});
