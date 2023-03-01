import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from '@reduxjs/toolkit';
import reducers from '../reducers';
import middleware from '../middleware';
import { Provider } from 'react-redux';

const mockStore = createStore(reducers, middleware);

describe('testing <LoginPage />', () => {
  it('should match the snapshot', () => {
    const comp = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    expect(comp).toMatchSnapshot();
  });

  it('should contain a login form with an ID input field, password input field, and a disabled Submit button.', () => {
    const comp = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
    expect(comp.getByTestId('login-form')).toBeInTheDocument();
    expect(comp.getByTestId('id-input')).toBeInTheDocument();
    expect(comp.getByTestId('pw-input')).toBeInTheDocument();
    const button = comp.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('should disable submit button when id is empty', () => {
    const user = { id: 'sarahedo', password: 'password123' };
    const comp = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(comp.getByTestId('pw-input'), { target: { value: user.password } });
    expect(comp.getByRole('button')).toBeDisabled();
  });

  it('should enable submit button when id and password both not empty.', () => {
    const user = { id: 'sarahedo', password: 'password123' };

    const comp = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(comp.getByTestId('id-input'), { target: { value: user.id } });
    fireEvent.change(comp.getByTestId('pw-input'), { target: { value: user.password } });
    expect(comp.getByRole('button')).not.toBeDisabled();
  });

  it('should disaply errors when user not found.', async () => {
    const user = { id: 'test', password: 'test' };
    act(() => {
      render(
        <Provider store={mockStore}>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </Provider>
      );
    });

    const form = await waitFor(() => screen.getByTestId('login-form'));
    fireEvent.change(screen.getByTestId('id-input'), { target: { value: user.id } });
    fireEvent.change(screen.getByTestId('pw-input'), { target: { value: user.password } });
    fireEvent.submit(form);

    const error = await waitFor(() => screen.getByTestId('errors-list'));
    expect(error).toBeInTheDocument();
    expect(error.textContent).toEqual('No user found.');
  });

  it('should disaply errors when password not matched.', async () => {
    const user = { id: 'sarahedo', password: 'test' };
    act(() => {
      render(
        <Provider store={mockStore}>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </Provider>
      );
    });
    const form = await waitFor(() => screen.getByTestId('login-form'));
    fireEvent.change(screen.getByTestId('id-input'), { target: { value: user.id } });
    fireEvent.change(screen.getByTestId('pw-input'), { target: { value: user.password } });
    fireEvent.submit(form);

    const error = await waitFor(() => screen.getByTestId('errors-list'));
    expect(error).toBeInTheDocument();
    expect(error.textContent).toEqual('Password not matched.');
  });
});
